import type { Meta, StoryObj } from '@storybook/react';
import { Timestamp } from 'firebase-admin/firestore';
import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-remix-react-router';

import { Post } from '~/schemas/post';

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
      <div style={{ width: '100%', height: '100%' }}>
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
        id: 'id1',
        content:
          '<img src="https://firebasestorage.googleapis.com/v0/b/rippingyard-dev.appspot.com/o/posts%2F2025%2F04%2F1743439204.png?alt=media&amp;token=7c717033-35ba-4075-a34d-63c4421dbac6">',
      },
    ],
  },
};
