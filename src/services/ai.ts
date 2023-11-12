import { OpenAiApiResponse } from '@/types/types';
import { models } from '@/config/models';
import { db } from '@/services/db';

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
