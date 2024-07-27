import { Message } from './openaiClient';

export const createCompletion = async (
  messages: Message[]
): Promise<Message> => {
  const response = await fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messages),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();

  return data.data;
};
