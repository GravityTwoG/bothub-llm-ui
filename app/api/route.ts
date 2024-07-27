import { createCompletion } from '@/api/openaiClient';

export async function POST(request: Request) {
  const messages = await request.json();

  console.log(messages);

  const response = await createCompletion(messages);

  return Response.json({ data: response });
}
