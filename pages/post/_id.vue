<template>
  <article class="block container">
    <Header :post="post" />
    <Content v-html="post.content" />
    <div class="footer">
      <p class="date">
        <fa-icon icon="clock" class="icon" />{{ post.publishedAt }}
      </p>
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
// import { mapGetters } from 'vuex'
import { Post } from '~/types/post'
import { normalize } from '~/services/post'
import {
  getTitle,
  getSocialTitle,
  getSummary,
  removeTitle,
  decodeEntities,
} from '~/plugins/typography'
// import Header from '~/components/molecules/PostHeader'
// import AdBottom from '~/components/atoms/Ad/AdsensePostBottom'
// import ShareButtons from '~/components/molecules/Share/ShareButtons'
// // import PostList from '~/components/organisms/PostList'

export default Vue.extend({
  async asyncData({ $fire, params, error, store }) {
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
        .then(doc => {
          console.log(doc)
          r.post = normalize(doc.id, doc.data())
          if (r.post.isDeleted === true) {
            r.post = {}
            throw new Error('ページが見つかりません')
          }
          // r.post.owner = {
          //   id: r.post.owner.id,
          // }
        })
        .catch(e => {
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
    getTitle(): string {
      return getTitle(this.post.content)
    },
    getSocialTitle(): string {
      return getSocialTitle(this.post.content) + ' - rippingyard'
    },
    getSummary(): string {
      return getSummary(this.post.content)
    },
    mainContent(): string {
      return removeTitle(this.post.content)
    },
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
    setPost(id, post): void {
      return this.$store.commit('post/setPost', {
        id,
        post,
      })
    },
  },
  head: ({ post }: { post: Post }) => {
    return {
      title: decodeEntities(getTitle(post.content)),
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: getTitle(post.content),
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: getTitle(post.content),
        },
        {
          hid: 'description',
          name: 'description',
          content: getSummary(post.content),
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: getSummary(post.content),
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: getSummary(post.content),
        },
        { hid: 'og:url', property: 'og:url', content: post.sociallink },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: post.sociallink,
        },
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
  > p {
    display: inline-block;
    .icon {
      margin-right: 5px;
    }
  }
}
</style>
