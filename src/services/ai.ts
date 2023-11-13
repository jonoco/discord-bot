import { OpenAiApiResponse } from '@/types/types';
import { models } from '@/config/models';
import { db } from '@/services/db';
import { err, ok } from '@/utils/result';

export async function sendQuestion(question: string) {
  const model = await db.get('model');
  const adapter = models.find((adapter) => adapter.name === model);
  if (!adapter) {
    return { error: new Error('Model not found') };
  }

  const { url } = adapter;
  const apiUrl = `${url}/v1/chat/completions`;

  const body = {
    messages: [
      {
        role: 'user',
        content: question,
      },
    ],
    mode: 'chat',
  };
  const response = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    return { error: new Error('Error sending question') };
  }

  const aiResponse: OpenAiApiResponse = await response.json();
  const choices = aiResponse.choices;
  const answer = choices[0].message.content;

  return { result: answer };
}

export async function askQuestionStream(question: string, cb: (msg: string) => Promise<void>) {
  const model = await db.get('model');
  const adapter = models.find((adapter) => adapter.name === model);
  if (!adapter) {
    return err('Model not found');
  }

  const { url } = adapter;
  const apiUrl = `${url}/v1/chat/completions`;
  const body = {
    messages: [
      {
        role: 'user',
        content: question,
      },
    ],
    mode: 'chat',
    stream: true,
  };
  const response = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    return err('Error sending question');
  }

  if (!response.body) {
    return err('Response body was null');
  }

  try {
    const decoder = new TextDecoder('utf-8');
    const reader = response.body.getReader();
    let answer = '';

    async function read() {
      const { value, done } = await reader.read();

      if (done) {
        return answer;
      }

      const decodedString = decoder.decode(value);
      const splitString = decodedString.slice(6);

      const aiResponse: OpenAiApiResponse = JSON.parse(splitString);
      const choices = aiResponse.choices;
      const fragment = choices[0].message.content;
      answer += fragment;

      cb(answer);

      await read();
    }
    await read();

    return ok(answer);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
      return err(error.message);
    } else {
      console.error('Unknown error', error);
      return err('Unknown error');
    }
  }
}
