import type { Meta, StoryObj } from '@storybook/react';
import { Timestamp } from 'firebase-admin/firestore';
import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-remix-react-router';

import type { Post } from '@rippingyard/schemas';

import { HeroArticles } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof HeroArticles> = {
  title: 'Component/HeroArticles',
  component: HeroArticles,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: 'centered',
  },
  // // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  // // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   // backgroundColor: { control: 'color' },
  // },
  // // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
};

export default meta;

type Story = StoryObj<typeof HeroArticles>;

const basePost: Post = {
  id: '',
  type: 'article',
  createdAt: null as unknown as Timestamp,
  updatedAt: null as unknown as Timestamp,
  publishedAt: { _seconds: 0, _nanoseconds: 0 } as unknown as Timestamp,
  status: 'published',
  content: '',
  isPublic: true,
  isDeleted: false,
  tags: [],
  items: [],
  suggestedTags: [],
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  decorators: [
    withRouter,
    (Story) => (
      <div style={{ width: '100%', height: '100%', border: '12px solid #000' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/' },
    }),
  },
  args: {
    posts: [
      {
        ...basePost,
        id: 'id1',
        content:
          '<h1>ケリー・ライカート『ショーイング・アップ』／クソみたいな日常は、それでも続く</h1><p>個展の準備で忙しいのに、<strong>シャワーからお湯が出ない（ここは太字です）</strong>。猫が殺しかけた鳩を隣人が保護したのに、その世話は自分に押し付けてくる。小さなストレスに囲まれて死にそうな気分になっていると、追い打ちをかけるように嫌なことばかりが続く。</p><img src="https://firebasestorage.googleapis.com/v0/b/rippingyard-dev.appspot.com/o/posts%2F2024%2F03%2F1709743910.jpg?alt=media&amp;token=07706f1b-e3f8-4c28-ae7d-c3240a961ea4"><p>シャワーの修理とか鳩の世話とか、<em>必要なことは何もやってくれない隣人ジョー（ここはイタリック）</em>は、セルフィッシュで付き合いづらいが、地元では個展を同時に2つも抱えている注目株のアーティスト。方や、社会不適合の兄、怠惰な居候にたかられている父、家族の問題を抱える主人公リジーも、小さな地元のギャラリーでの個展を控え、陶芸作品の制作に追われているが、注目度には差がある。</p><p>作品は焦げ、シャワーはいつまでも使えず、<s>鳩が気になっている（打ち消し線）</s>。追い込み、追い込まれ、目の下には隈を作ったままボロボロの体で帰宅すると、壊れたシャワーは放置しているジョーが自宅に友人を招いてパーティーを開いている。鳩を思わせる小ぶりな鳥のローストを運ぶジョー。イライラを募らせ、厭なメッセージを残してしまうリジーも、<mark>不愉快と疲労に押しつぶされて酷い人間に見える（ハイライト）。</mark></p><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://twitter.com">ランドアート</a>について語る兄が言うように、「声をあげても、人々は耳を傾けようとしない」。兄や、リジーの孤独とストレスは、こうして爆発しそうに見える。</p><p>個展の開催日がやってくる。ジョーのそれより規模も小さく注目度も低いが、それでも確かに個展は開催されていて、そこには、少しだけ誇らしげで柔らかくなったリジーの顔が見える。世界は相変わらずだが、鳩の折れた翼も癒えるし、友だちは顔を見せてくれる。日常はクソのままだけど、それでも人は生きていく。</p><hr><h2>H2</h2><p>ここにリストを表示します。</p><ul><li><p>リスト1</p></li><li><p>リスト2</p></li><li><p>リスト3</p></li></ul><hr><h2>H3</h2><p>番号付きリスト</p><ol><li><p>リスト1</p></li><li><p>リスト2</p></li><li><p>リスト3</p></li></ol><blockquote><p>引用</p><p>引用箇所はセリフ</p></blockquote><pre><code>コードです。均等</code></pre>',
      },
      {
        ...basePost,
        id: 'id2',
        content:
          '<h1>吉田大八監督『敵』／生き長らえてしまう</h1><img src="https://firebasestorage.googleapis.com/v0/b/rippingyard-dev.appspot.com/o/posts%2F2025%2F04%2F1744725096.webp?alt=media&amp;token=d4b7710a-c72c-4843-a07b-065a7af663b9"><p>生（性）と死のオブセッションが余生を支配している。来るべきXデーに至るまで。結果として見事、完璧に<strong>バタイユ的なモチーフ</strong>が展開している。<strong>斯様に無様で滑稽なのか、我々の人生は！</strong></p><p>主人公・渡辺（長塚京三）は、隠居状態の元仏文科大学教授。彼は、<strong>最強の名字「渡辺」（©️令和ロマン）</strong>を持つだけではなく、「フランス文学」の「大学教授」であったことに、人知れず権威を見出している。趣味がよく、都内に小綺麗な一軒家を持ち、悠々自適な隠居生活を送っていることに感じる誇り。その「誇り」は、表層的な「豊かさ」「慎ましさ」からは隠匿された場所で、<strong>下卑た感情と接触している</strong>。何度も繰り返し描かれる食事のシーン。朝食で魚を丁寧に焼き、自ら串に刺した鶏肉を卓上の七輪で夕餉に炙っている姿は、まるで「丁寧な生活」の見本であるが、それは凶器のように美しい元教え子（瀧内公美）の肢体や、老人である彼からすれば年端も行かぬ女学生（河合優実）の無邪気な好奇心や憧れに対して、<strong>性的に接続した優雅さ</strong>なのである。</p><p>その優雅な余生を送る老教授・渡辺だが、食べる時と話している時以外は一転、まるで死んでいるように見える。「死のいとこ」である睡眠時、昼のひとときが嘘のように、<strong>悶え苦しんで倒れた死体がベットの上</strong>で、今日もまた生き長らえてしまった。こうして、死と肉薄する瞬間に、<strong>せん妄のような悪夢</strong>が現実と見紛うばかりに襲いかかる。亡くなった妻への恋慕を悉く失念し、若い女たちに文字通り「鼻の下を伸ばす」時、生への渇望は蘇り、「敵」＝死を前にした老人が醜態を晒していく。そうした、人であるが故の醜さが、知的な人生を蝕み矜持を奪った後に、暗転する。ここに描かれているのは、そんな<strong>人生の黄昏</strong>である。</p>',
      },
      {
        ...basePost,
        id: 'id3',
        content:
          '<p>捜査関係者やマスコミの杜撰さを突き付け、冤罪事件に再び光を当てる作品だと思って観に行ったらそれは前半でサクッと綺麗に終わり、後半でズビャギンツェフも裸足で逃げ出すようなあっけらかんとしたスモールコミュニティホラーが顕現してた。想像の三倍ぐらい面白かった。</p><img src="https://firebasestorage.googleapis.com/v0/b/rippingyard-dev.appspot.com/o/posts%2F2025%2F02%2F1739841155.jpg?alt=media&amp;token=f25ffa26-d22c-426b-9263-ff7908477f3d"><p>保険金詐欺で得たあぶく銭を机の上に積んで自慢し、百貨店の外商呼んで宝石に時計を購入、子どもたちもその環境で過ごしていたら、家庭の磁場は歪むだろう、そりゃ。そこに和泉という謎の居候まで登場して、保険金詐欺に加担させていたっつうんだから、これは沼だ、もう。</p><p>周囲のちょっとした愚かさが積み重なって、澱みのように標的が決まり、いつの間にか呪われている。この事件からインスパイアされた物語は多くあれど、水ぶっかけるシグニチャームーブとか、被害の多さと悲惨さ、そうした派手な動きの奥にさらなる得体の知れない邪悪未満のまぬけ<strong>（©️根本敬）</strong>まで到達出来る作品は少ない。ドキュメンタリーでそこまで露出してしまったのも興味深い。黒沢清案件。</p>',
      },
      {
        ...basePost,
        id: 'id3',
        content:
          '<p>俺も「大音楽家（流水大説みたいなもんと捉えてください）」の端くれなので、宅録作家の物語は解像度が高すぎて、デイミアン・チャゼルに対する菊地成孔先生みたいになっちゃったらどうしよう、と思ってたんすけど、こらそれ以前の問題。管理人の仕事を「何もない一日」と称して、終業後にステレオコンデンサマイク装着したスマホで収録した環境音を、Ableton Live 10に取り込んでビートメイクする…みたいなのには何も言わん。ジェネリックNujabesみたいな、な。ああいうの。Lo-Fi Hiphop、っつうの？しかしながら、下の階に住んでるかわいこちゃんが、夜に鳴らした自作曲を「良い曲」と称したことに気をよくした直後に「彼氏と話してたんやけど（関西弁）」の言に、あっという間に意気消沈するのはどういう了見かね。ふけつー！ふけつですよ、この人！「頭の中で流れてる…音…これを形にしたい…だけ…」みたいなこと言っておいて、彼氏の影が見えるだけでこの塩対応。</p><p>通常、映画見てる時に「爆笑した」とか言うのって、脳内の描写じゃないですか。あんま本当に爆笑することってない。しかしながら、本作序盤の器物破損展開には、マジで立ち上がって爆笑しました。すげー。</p>',
      },
      {
        ...basePost,
        id: 'id4',
        content:
          '<img src="https://firebasestorage.googleapis.com/v0/b/rippingyard-dev.appspot.com/o/posts%2F2025%2F04%2F1743439204.png?alt=media&amp;token=7c717033-35ba-4075-a34d-63c4421dbac6">',
      },
    ],
    label: 'Latest Articles',
  },
};
