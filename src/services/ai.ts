import { OpenAiApiResponse } from "@/types/types";

export async function sendQuestion(question: string) {
  const url = 'http://127.0.0.1:5001/v1/chat/completions';
  const body = {
    messages: [
      {
        role: 'user',
        content: question,
      },
    ],
    mode: 'chat',
  };
  const response = await fetch(url, {
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
  const choices =  aiResponse.choices;
  const answer = choices[0].message.content;

  return { result: answer };
}
