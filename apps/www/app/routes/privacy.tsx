import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { json } from '@vercel/remix';
import type { LoaderFunction, MetaFunction } from '@vercel/remix';

import { Heading } from '~/components/Heading';
import { LastUpdates } from '~/components/LastUpdates';
import { articleStyle } from '~/styles/article.css';
import { containerStyle } from '~/styles/container.css';

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  try {
    const title = 'プライバシーポリシー';
    const canonicalUrl = new URL('terms', request.url).toString();

    return json({
      title,
      canonicalUrl,
      meta: [{ tagName: 'link', rel: 'canonical', href: canonicalUrl }],
    });
  } catch (e) {
    throw new Response('Not Found', { status: 404 });
  }
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  // if (!data) return [];
  const { title, canonicalUrl } = data;

  // const summary = getSummary(post.content, 340);
  // const thumbnail = getThumbnailFromText(post.content);
  // const description = getSummary(post.content, 140);
  const htmlTitle = `${title} - rippingyard`;
  // const image = thumbnail || '/images/ogimage.png';

  return [
    { title: htmlTitle },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    // { name: 'description', content: description },
    // { property: 'og:title', content: htmlTitle },
    // { property: 'og:description', content: summary },
    // { property: 'og:url', content: canonicalUrl },
    // { property: 'og:image', content: image },
    // { name: 'twitter:title', content: htmlTitle },
    // { name: 'twitter:description', content: summary },
    // { name: 'twitter:image', content: image },
    // { name: 'twitter:card', content: 'summary' },
  ];
};

export default function Main() {
  const { title } = useLoaderData<typeof loader>();

  return (
    <>
      <Heading>{title}</Heading>
      <main className={containerStyle}>
        <section className={articleStyle}>
          <blockquote>
            <p>
              本サービスでは運営のために、あなたの個人情報を扱います。このプライバシーポリシーには、本サービスがあなたの個人情報をどのように扱い、それを何に利用するのかなどについて書かれています。
            </p>
          </blockquote>

          <h2>収集する個人情報</h2>
          <p>
            本サービスでは、あなたの個人情報を以下のような形で収集します。あなたの同意がない限り、これら以外にあなたの個人情報を収集したり、利用することはありません。
          </p>
          <ul>
            <li>
              <strong>メールアドレス</strong>
              ：メンバーのみなさんからは、メールアドレスを収集して保管します。このメールアドレスは、本サービスの情報を送信するために使用することがあり、その際に外部サービスを利用することがあります。メール送信以外の用途で、あなたの許可なしにメールアドレスを第三者に渡すことはありません。
            </li>
            <li>
              <strong>クッキー</strong>
              ：本サービスにアクセスした際、あなたのクッキーを収集します。このクッキーは、あなたが本サービスにログインするために必要な情報です。
            </li>
            <li>
              <strong>SNSのユーザーデータ</strong>
              ：本サービスでは、TwitterなどのSNSと連携することで、あなたのSNSアカウントの情報を収集することがあります。これは、OAuthという仕組みを利用して収集するため、あなたがアクセスを許可する情報をコントロール可能で、いつでも提供を止めることができます。
            </li>
            <li>
              <strong>アクセスデータ</strong>
              ：本サービスでは、あなたのアクセスデータを収集します。このアクセスデータには、OSの種類やIPアドレスなどが含まれますが、それらをあなた個人と結びつけることは困難です。
            </li>
          </ul>

          <h2>個人情報の用途</h2>
          <p>
            本サービスを利用するために収集する以外に、以下のような用途であなたの個人情報を使用することがあります
          </p>

          <ul>
            <li>
              <strong>お知らせの送信</strong>
              ：本サービスではあなたに、本サービスのコンテンツ更新やおすすめコンテンツのお知らせのため、メールマガジンを発行したり、モバイルアプリのプッシュ通知を行います。あなたは、ユーザー設定を変更していただくことにより、いずれも停止することができます。
            </li>
            <li>
              <strong>リコメンデーション</strong>
              ：本サービスでは、あなたの本サービス内での行動履歴に基づいて、おすすめコンテンツを表示したり、お知らせすることがあります。
            </li>
          </ul>

          <h2>第三者への提供</h2>
          <p>
            本サービスの改善のため、他社のサービスと連携することがあります。ただし、このサービスへのログインに必要なIDやパスワードを提供することはありません。法律などの要請に応じて、あなたの同意なしに、情報を開示しなければならない可能性はあります。
          </p>

          <h2>お問い合わせ</h2>
          <p>
            このプライバシーポリシーについてご質問などがあれば、
            <a href="mailto:info@rippingyard.com">info@rippingyard.com</a>
            までお問い合わせください。
          </p>
        </section>
        <LastUpdates updates={['2021年5月14日']} />
      </main>
    </>
  );
}
