// import { Form, useActionData, useLoaderData } from '@remix-run/react';
import {
  ActionFunction,
  json,
  LoaderFunctionArgs,
  redirect,
} from '@vercel/remix';
import OpenAI from 'openai';
// import { useEffect, useState } from 'react';

// import { Button } from '~/components/Button';
// import { FormTextarea } from '~/components/FormTextarea';
import { commitSession, getMe, getSession } from '~/middlewares/session.server';

export const config = {
  maxDuration: 18,
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
    console.log('run', run);

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
    return json({});
  }
};

// export default function Index() {
//   const { content } = useLoaderData<typeof loader>();
//   const data = useActionData<typeof action>();

//   console.log('data', data);

//   return (
//     <Form method="POST">
//       {data?.result && (
//         <>
//           {data?.result?.categories.length > 0 && (
//             <div>
//               <h2>Categories</h2>
//               <ul>
//                 {data?.result?.categories.map((category: string) => (
//                   <li>{category}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {data?.result?.entities.length > 0 && (
//             <div>
//               <h2>Entities</h2>
//               <ul>
//                 {data?.result?.entities.map(
//                   (entity: {
//                     value: string;
//                     relevance: number;
//                     categories: string[];
//                   }) =>
//                     entity.relevance > 0.5 && (
//                       <li>
//                         <h3>{entity?.value}</h3>
//                         <p>
//                           {entity?.relevance} / {entity?.categories.join(', ')}
//                         </p>
//                       </li>
//                     )
//                 )}
//               </ul>
//             </div>
//           )}
//         </>
//       )}

//       <FormTextarea name="content" defaultValue={data?.content || content} />
//       <Button>送信</Button>
//     </Form>
//   );
// }
