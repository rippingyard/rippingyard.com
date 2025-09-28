import OpenAI from 'openai';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-router';

import { Button } from '~/components/Button';
import { FormInput } from '~/components/FormInput';
import { Heading } from '~/components/Heading';

import { Route } from './+types/lab';

export const loader = async () => {
  return {};
};

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const formData = await request.formData();

    const interest = formData.get('interest') as string;

    console.log('interest', interest);

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_APIKEY,
      organization: process.env.OPENAI_ORGANIZATION_ID,
      project: process.env.OPENAI_PROJECT_ID,
    });

    const chat = await openai.chat.completions.create({
      messages: [
        {
          content: `ユーザーが今興味のあることは以下です。${interest}`,
          role: 'user',
        },
      ],
      model: 'gpt-4o',
      // stream: true,
    });

    return {
      chat,
      // prompt,
    };
  } catch (e) {
    console.error(e);
    return {};
  }
};

export default function Index({ actionData: data }: Route.ComponentProps) {
  const { t } = useTranslation();
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
      <Heading level="partial">{t('caption.whatIsYourCuriosity')}</Heading>
      <FormInput name="interest" />
      <Button>{t('send')}</Button>
      <hr />
      <ul>
        {messages.map((message, index) => (
          <li
            key={`chat-item-${index}`}
            // className={clsx([
            //   itemStyle,
            //   message.role === 'user' ? userStyle : assistantStyle,
            // ])}
          >
            {`${message.content}`}
            <input
              type="hidden"
              name="messages"
              value={JSON.stringify(message)}
            />
          </li>
        ))}
      </ul>
    </Form>
  );
}
