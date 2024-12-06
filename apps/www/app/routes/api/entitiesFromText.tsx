import {
  ActionFunction,
  json,
  LoaderFunctionArgs,
  redirect,
} from '@vercel/remix';
import OpenAI from 'openai';

import { commitSession, getMe, getSession } from '~/middlewares/session.server';

export const config = {
  maxDuration: 30,
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { uid } = await getMe(request);
  if (!uid) {
    const session = await getSession(request.headers.get('Cookie'));
    session.flash('alertMessage', '利用権限がありません。ログインしてください');
    return redirect('/login', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  }
  return json({
    content:
      '少し酒を飲んでから帰宅。少しだけ眠って、下北沢K2で『NN4444』。俺の後ろで満席になって焦った。人が入りすぎてる。気鋭の日本人映像作家によるホラー短編4本のオムニバス。全作品良かった（みんな編集が凄すぎる）のだが、その中でも最後の『Void』の出来が良すぎて吹っ飛んだ。昨日観た黒沢清の短編を思い出してしまうような不条理さで、一見何を描いているのかよくわからない。が、そこには何かがある。おそらく、何の脈絡もなく挿入される池田良さんが喫茶店で話しているシーンがキーになっていて、「負の空気」をやり過ごすためには「虚無」になるしかない、という諦念。友人の死に接しても「すっごい、遊ぶね」と、死を軽んじているように見える友人たちの態度に違和感を覚えていた主人公が、「だょね」と遂に飛び込んでしまうと、その瞬間、幾多の身体が横たわって見える。特に主演の野内まるさんの演技が素晴らしかった。',
  });
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();

    const content = formData.get('content') as string;
    const openai = new OpenAI({
      apiKey: process.env.VITE_OPENAI_APIKEY,
      organization: process.env.VITE_OPENAI_ORGANIZATION_ID,
      project: process.env.VITE_OPENAI_PROJECT_ID,
    });

    const thread = await openai.beta.threads.create();
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content,
    });

    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: process.env.VITE_OPENAI_ENTITY_ASSISTANT as string,
    });

    if (run.status !== 'completed') throw new Error(run.status);

    const messages = await openai.beta.threads.messages.list(run.thread_id);

    let result = {};
    for (const message of messages.data.reverse()) {
      if (message.role !== 'assistant') continue;
      if (message.content[0].type !== 'text') continue;
      result = JSON.parse(message.content[0].text.value);
      console.log('result', result);
    }

    return json({
      content,
      result,
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};
