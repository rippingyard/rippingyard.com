import { useLoaderData } from '@remix-run/react';
import { json } from '@vercel/remix';
import type { LoaderFunctionArgs } from '@vercel/remix';
import type { LoaderFunction, MetaFunction } from '@vercel/remix';

import { Heading } from '~/components/Heading';
import { LastUpdates } from '~/components/LastUpdates';
import { articleStyle } from '~/styles/article.css';
import { containerStyle } from '~/styles/container.css';

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  try {
    const title = '利用規約';
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
              本利用規約は、WEBサービス「
              <a href="https://www.rippingyard.com/" target="_blank">
                ripping yard
              </a>
              」のユーザーに適用される、サービス利用にあたっての契約です。本サービスをご利用いただく際に、あなたにお願いしたいことについて書かれています。
            </p>
          </blockquote>

          <h2>目的と機能</h2>
          <p>
            本サービスは、<strong>「公開するライフログ」</strong>
            として日々の行動を記したコンテンツを提供し、ユーザー同士の発見とコミュニケーションを促進することを目的としたWEBサービスです。
          </p>
          <ul>
            <li>
              あなたは、自己の責任において本サービスを利用するものとし、本サービスを利用してなされた一切の行為およびその結果について一切の責任を負うものとします。
            </li>
            <li>
              本サービスを利用することで、万一、ユーザー間でのトラブルが生じた際には、ユーザー自身で解決していただくことになります。
            </li>
          </ul>

          <h2>著作権</h2>
          <p>
            <strong>あなたの制作したコンテンツはあなたのものです。</strong>
            しかし、本サービス上に公開したコンテンツは、私たちの運営上必要な著作権について使用を許諾いただく必要があります。また、法律上の要請に従い、あなたのコンテンツを第三者に開示しなければならない場合があることをご承知おきください
          </p>
          <ul>
            <li>あなたの制作したコンテンツの著作権は、あなたに帰属します。</li>
            <li>
              本サービスでは、あなたに対してコンテンツの著作権の譲渡、貸与等を強制することはありません。
            </li>
            <li>
              画像など、第三者のコンテンツを使用する場合は、その第三者の定める規約などを守り、引用の要件を満たす形で使用してください。
            </li>
          </ul>

          <h2>禁止事項</h2>
          <p>
            他のユーザーおよび本サービスへの迷惑になる以下のような行為を行わないよう心がけて下さい。あなたの行為が本利用規約に違反しており、サービス運用の妨げになると判断された場合、残念ですが、本サービスの一部または全部を停止することがあります。この場合、本サービスはあなたに対し何ら通知する義務を負いません。
          </p>
          <ol>
            <li>コンテンツを複製、販売したり、無許可で利用すること</li>
            <li>法令や公序良俗に違反する行為を行うこと</li>
            <li>他のユーザーが不快になる行為を継続して行うこと</li>
            <li>本サービスの障害となる行為を行うこと</li>
          </ol>
          <p>
            また、以下に該当するようなコンテンツの制作および本サービスにおける公開は禁止します。該当すると判断されたコンテンツは、告知なしに削除したり、ユーザーの利用を停止したりする可能性があります。このように、利用禁止またはコンテンツの削除等によりあなたに損害が生じた場合であっても、私たちは損害賠償責任その他一切の責任を負わないものとします。
          </p>
          <ol>
            <li>盗作、剽窃など、他者の著作権等を侵害しているもの。</li>
            <li>肖像権、名誉・プライバシー等を侵害するもの。</li>
            <li>犯罪行為、違法行為を推奨するもの。</li>
            <li>スパム行為であると判断されたもの。</li>
            <li>
              過度にわいせつなもの、過度に暴力的な表現、その他過度の不快感を及ぼすおそれのあるもの。
            </li>
            <li>
              民族・宗教・人種・性別・年齢等に対する差別的な表現を含むもの。
            </li>
            <li>
              コンピュータウィルスなどの、有害なコンピューター・プログラムを含むもの。
            </li>
            <li>本サービスのサーバーに過度な負担をかけているもの。</li>
            <li>本サービスの運営に支障が生じると判断されたもの。</li>
            <li>その他、不適切な内容であると判断されたもの。</li>
          </ol>
          <p>
            また、コンテンツについて18歳以上向けの表現を含むと判断し、18歳以上向けのコンテンツである旨の表示や閲覧制限をかける場合があります。
          </p>

          <h2>休止及び停止</h2>
          <ol>
            <li>
              障害対応や定期メンテナンス等を行う場合、本サービスの一部または全部を停止することがあります。
            </li>
            <li>
              あなたに対して事前に通知することなく、本サービスの機能の一部を停止、または中断する場合があります。
            </li>
            <li>
              コンテンツを公開する内容および期間は、各メンバーが定めるとおりとします。当人の事情により、コンテンツの内容や公開期間を変更したり、公開を停止することもあります。
            </li>
          </ol>

          <h2>責任</h2>
          <p>
            本サービスに対する不正アクセス・ハッキング等のサイバー攻撃、本サービスを運用するハードウェアの障害、バグを含むソフトウェアの障害については、それらが発生しないよう努めますが、保証てきるものではありません。
            <br />
            私たちの故意によって発生した損害を除き、本サービスを利用することであなたに発生した損害について、私たちが責任を負うことはありません
          </p>
          <ul>
            <li>
              本サービスは、あなたが投稿したコンテンツの中に、コンピュータウィルス等有害なものが含まれていないことを完全に保証することはできません。
            </li>
          </ul>

          <h2>変更</h2>
          <p>
            <strong>
              本サービスの内容や、本利用規約は、変更される可能性があります。
            </strong>
            変更後の本利用規約は、原則、本サイト上に表示した時点より効力を生じるものとします。
            <br />
            あなたが本利用規約の変更日以後に本サービスを利用した場合は、その変更内容について異議なく同意したものとみなします。
          </p>

          <h2>準拠法と裁判管轄</h2>
          <ul>
            <li>本利用規約は日本法を準拠法とします。</li>
            <li>
              本利用規約の各事項に関連して紛争が生じた場合は、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </li>
          </ul>

          <h2>お問い合わせ</h2>
          <p>
            この利用規約についてご質問などがあれば、
            <a href="mailto:info@rippingyard.com">info@rippingyard.com</a>
            までお問い合わせください。
          </p>
        </section>
        <LastUpdates updates={['2021年5月14日']} />
      </main>
    </>
  );
}
