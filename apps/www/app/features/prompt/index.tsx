import clsx from 'clsx';
import OpenAI from 'openai';
import { FC } from 'react';

import { Button } from '~/components/Button';
import { FormInput } from '~/components/FormInput';

import { assistantStyle, itemStyle, userStyle } from './style.css';

export type OpenAIMessage = {
  content: string | null;
  role: 'assistant' | 'user' | 'system';
};

type Props = {
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
};

export const Prompt: FC<Props> = ({ messages = [] }) => {
  return (
    <>
      <ul>
        {messages.map((message, index) => (
          <li
            key={`chat-item-${index}`}
            className={clsx([
              itemStyle,
              message.role === 'user' ? userStyle : assistantStyle,
            ])}
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

      <FormInput name="prompt" defaultValue="おはよう！" />
      <Button>送信</Button>
    </>
  );
};
