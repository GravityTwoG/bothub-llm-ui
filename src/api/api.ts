import { Configuration, OpenAIApi } from 'openai-edge';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = import.meta.env.VITE_OPENAI_API_URL;

const configuration = new Configuration({
  apiKey: API_KEY,
  basePath: API_URL,
});
const openai = new OpenAIApi(configuration);

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export const createCompletion = async (messages: Message[]) => {
  const completion = await openai.createChatCompletion({
    messages: messages.map((message) => ({
      role: message.role,
      content: message.content,
    })),
    model: 'gemini-pro',
  });

  const json = await completion.json();

  if (json.error) {
    throw new Error(json.error.message);
  }

  const message = json.choices[0].message as Message;
  message.id = json.id;

  return message;
};
