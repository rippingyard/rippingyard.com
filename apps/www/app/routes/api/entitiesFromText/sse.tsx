import OpenAI from 'openai';
import { data, redirect } from 'react-router';

import {
  SuggestedCategory,
  SuggestedEntity,
} from '~/features/postEditor/settingModal';
import { translation } from '~/middlewares/i18n/translation.server';
import { commitSession, getMe, getSession } from '~/middlewares/session.server';

export const config = {
  maxDuration: 60,
};

export type ServerStatus =
  | 'in_progress'
  | 'completed'
  | 'queued'
  | 'requires_action'
  | 'cancelling'
  | 'cancelled'
  | 'failed'
  | 'incomplete'
  | 'expired';

export interface ServerMessage {
  content: string;
  status?: ServerStatus;
  result?: {
    categories: SuggestedCategory[];
    entities: SuggestedEntity[];
  };
  progress?: boolean;
  error?: string;
  completed?: boolean;
}

const wait = async (msec = 1000) => {
  await new Promise((resolve) => setTimeout(resolve, msec));
};

const logContent = (content: string = '') => content.substring(0, 100) + '...'; // ログ用に省略

const formatData = (dataObject: ServerMessage) =>
  `data: ${JSON.stringify(dataObject)}\n\n`;

export const loader = async ({ request }: { request: Request }) => {
  // 認証チェック
  const { uid } = await getMe(request);
  const { t } = await translation(request);

  if (!uid) {
    const session = await getSession(request.headers.get('Cookie'));
    session.flash('alertMessage', t('error.noPermission'));
    return redirect('/login', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  }

  // POSTリクエストからのリダイレクトではない場合
  return new Response(
    JSON.stringify({
      error: t('error.invalidHttpMethod', { method: 'POST' }),
    }),
    {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const action = async ({ request }: { request: Request }) => {
  // 認証チェック
  const { uid } = await getMe(request);
  const { t } = await translation(request);

  if (!uid) {
    const session = await getSession(request.headers.get('Cookie'));
    session.flash('alertMessage', t('error.noPermission'));
    return redirect('/login', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  }

  // FormDataからcontent取得
  const formData = await request.formData();
  const content = formData.get('content') as string;

  if (!content)
    return data(
      { error: t('error.requiredField', { field: t('content') }) },
      { status: 400 }
    );

  // ストリーミング用のTransformStream
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();

  // 空のデータで初期化
  writer.write(
    encoder.encode(
      formatData({
        content: logContent(content), // 長いcontentのログを防ぐために省略
        result: {
          categories: [],
          entities: [],
        },
      })
    )
  );

  // 非同期でOpenAI処理を開始
  (async () => {
    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_APIKEY,
        organization: process.env.OPENAI_ORGANIZATION_ID,
        project: process.env.OPENAI_PROJECT_ID,
      });

      // スレッドとメッセージの作成
      const thread = await openai.beta.threads.create();
      await openai.beta.threads.messages.create(thread.id, {
        role: 'user',
        content,
      });

      // Runの作成
      const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: process.env.OPENAI_ENTITY_ASSISTANT as string,
      });

      // ステータスをポーリングして進捗を送信
      let status = await openai.beta.threads.runs.retrieve(thread.id, run.id);

      while (
        status.status !== 'completed' &&
        status.status !== 'failed' &&
        status.status !== 'cancelled'
      ) {
        // 定期的にステータスを更新
        await wait();
        status = await openai.beta.threads.runs.retrieve(thread.id, run.id);

        // 処理中のステータスを送信
        writer.write(
          encoder.encode(
            formatData({
              content: logContent(content), // ログ用に省略
              status: status.status,
              progress: true,
            })
          )
        );
      }

      if (status.status === 'completed') {
        const messages = await openai.beta.threads.messages.list(run.thread_id);

        let result = {};
        for (const message of messages.data.reverse()) {
          if (message.role !== 'assistant') continue;
          if (message.content[0].type !== 'text') continue;
          result = JSON.parse(message.content[0].text.value);
          console.log('result', result);
          break;
        }

        // 最終結果を送信
        writer.write(
          encoder.encode(
            formatData({
              content: logContent(content), // ログ用に省略
              result: result as ServerMessage['result'],
              completed: true,
            })
          )
        );
      } else {
        // エラー状態を送信
        writer.write(
          encoder.encode(
            formatData({
              content: logContent(content), // ログ用に省略
              error: `処理が完了しませんでした: ${status.status}`,
              completed: true,
            })
          )
        );
      }
    } catch (error: unknown) {
      console.error('Stream processing error:', error);
      // エラー状態を送信
      writer.write(
        encoder.encode(
          formatData({
            content: logContent(content), // ログ用に省略
            error: `処理中にエラーが発生しました: ${error instanceof Error ? error.message : 'Unknown error'}`,
            completed: true,
          })
        )
      );
    } finally {
      writer.close();
    }
  })();

  // ストリームレスポンスを返す
  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
};
