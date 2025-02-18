import OpenAI from 'openai';
import { useEffect, useState } from 'react';
import { Form, useActionData } from 'react-router';

import { Prompt } from '~/features/prompt';

import { Route } from './+types/lab';

export const loader = async () => {
  return {};
};

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const formData = await request.formData();

    const prompt = formData.get('prompt') as string;
    const rawMessages = formData.getAll('messages') as string[];

    const messages = rawMessages.map(
      (str) =>
        JSON.parse(str) as OpenAI.Chat.Completions.ChatCompletionMessageParam
    );

    console.log('messages', messages);

    const openai = new OpenAI({
      apiKey: process.env.VITE_OPENAI_APIKEY,
      organization: process.env.VITE_OPENAI_ORGANIZATION_ID,
      project: process.env.VITE_OPENAI_PROJECT_ID,
    });

    const chat = await openai.chat.completions.create({
      messages: [...messages, { role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      // stream: true,
    });

    return {
      chat,
      prompt,
    };
  } catch (e) {
    console.error(e);
    return {};
  }
};

export default function Index() {
  const data = useActionData<typeof action>();
  const [messages, setMessages] = useState<
    OpenAI.Chat.Completions.ChatCompletionMessageParam[]
  >([]);

  useEffect(() => {
    if (!data) return;
    const { chat, prompt } = data as {
      chat: OpenAI.Chat.Completions.ChatCompletion;
      prompt: string;
    };
    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: prompt,
      },
      ...chat.choices.map(
        (choice) =>
          ({
            content: choice.message.content,
            role: choice.message.role,
          }) as OpenAI.Chat.Completions.ChatCompletionMessageParam
      ),
    ]);
  }, [data]);

  return (
    <Form method="POST">
      <Prompt messages={messages} />
    </Form>
  );
}
