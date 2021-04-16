<template>
  <article class="block container">
    <Header :post="post" />
    <Content v-html="post.content" />
    <AdsensePostBottom />
    <div v-if="post.owner" class="owner">
      <UserCard :user="post.owner" />
    </div>
    <div class="footer">
      <p class="date">
        <fa-icon icon="clock" class="icon" />{{ post.publishedAt }}
      </p>
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Context } from '~/types/context'
import { Post } from '~/types/post'
import { normalize } from '~/services/post'
import {
  getTitle,
  getSocialTitle,
  getSummary,
  removeTitle,
  getThumbnail,
  decodeEntities,
} from '~/plugins/typography'
// import Header from '~/components/molecules/PostHeader'
// import AdBottom from '~/components/atoms/Ad/AdsensePostBottom'
// import ShareButtons from '~/components/molecules/Share/ShareButtons'
// // import PostList from '~/components/organisms/PostList'

export default Vue.extend({
  async asyncData({ $fire, params, error, store }: Context) {
    const r: {
      post?: Partial<Post>
    } = {}
    const postId = params.id // TODO: 無毒化
    r.post = store.state.post.posts[postId]
    console.log('Post: Stored', store.state.post.posts)
    if (r.post) {
      console.log('Post: Hit Cache', postId)
    } else {
      console.log('Post: No Cache', postId)
      await $fire.firestore
        .collection('posts')
        .doc(postId)
        .get()
        .then(async (doc: any) => {
          // console.log(doc)
          r.post = await normalize(doc.id, doc.data(), store)
          if (!doc.exists || r.post.isDeleted === true) {
            r.post = {}
            throw new Error('ページが見つかりません')
          }
        })
        .catch((e: any) => {
          error({ statusCode: 404, message: e.message })
        })
    }
    return r
  },
  data(): {
    title: string
    post: Partial<Post>
  } {
    return {
      title: '',
      post: {},
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
    getTitle(): string {
      return getTitle(this.$data.post.content)
    },
    getSocialTitle(): string {
      return getSocialTitle(this.$data.post.content) + ' - rippingyard'
    },
    getSummary(): string {
      return getSummary(this.$data.post.content)
    },
    mainContent(): string {
      return removeTitle(this.$data.post.content)
    },
    thumbnail() {
      return getThumbnail(this.$data.post.contentOriginal)
    },
  },
  mounted() {
    if (!this.isAuthenticated && !this.$data.post.isPublic) {
      this.$data.post = {}
      this.snack('ログインしてください')
      this.$router.push('/login');
      // throw new Error('会員限定記事です')
    }
  },
  // async mounted({
  //   post,
  //   setPost,
  //   getOwner,
  // }: {
  //   post: Post
  //   setPost: Function
  //   getOwner: Function
  // }) {
  //   setPost(post.id, post)
  //   if (post) {
  //     if (post.owner && post.owner.id) {
  //       post.owner = await getOwner(post.owner.id)
  //     }
  //   }
  // },
  methods: {
    setPost(id: string, post: Partial<Post>): void {
      return this.$store.commit('post/setPost', {
        id,
        post,
      })
    },
  },
  head() {
    return {
      title: decodeEntities(getTitle(this.$data.post.content)),
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: getTitle(this.$data.post.content),
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: getTitle(this.$data.post.content),
        },
        {
          hid: 'description',
          name: 'description',
          content: getSummary(this.$data.post.content),
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: getSummary(this.$data.post.content),
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: getSummary(this.$data.post.content),
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.$data.post.sociallink,
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: this.$data.post.sociallink,
        },
        // TODO: 他サーバーにあるものをOGImageとして使うのはいかがなものか
        // {
        //   hid: 'og:image',
        //   property: 'og:image',
        //   content: this.thumbnail || 'https://www.rippingyard.com/img/ogimage.png',
        // },
        // {
        //   hid: 'twitter:image',
        //   name: 'twitter:image',
        //   content: this.thumbnail || 'https://www.rippingyard.com/img/ogimage.png',
        // },
      ],
    }
  },
})
</script>
<style lang="scss" scoped>
.footer {
  padding-top: 80px;
  font-size: 0.9rem;
  color: $gray-black;
  font-weight: 800;
  position: relative;
  &::before {
    content: '';
    width: 18px;
    height: 1px;
    background-color: $gray-black;
    top: 70px;
    left: 0;
    display: block;
    position: absolute;
  }
  > p {
    display: inline-block;
    .icon {
      margin-right: 5px;
    }
  }
}
</style>
