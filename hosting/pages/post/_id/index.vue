<template>
  <div class="block container">
    <article class="post">
      <Header :post="post" />
      <div v-if="getTitle" class="heading">
        <h1>{{ getTitle }}</h1>
      </div>
      <Content v-html="mainContent" />
      <AdsensePostBottom />
      <CommentList :parent-id="parentId" />
      <CommentForm
        :parent-id="parentId"
        :is-public="post.isPublic"
      />
      <div v-if="post.entities" class="entities">
        <EntitySimpleList :entities="post.entities" />
      </div>
      <div v-if="post.owner" class="owner">
        <UserCard :user="post.owner" />
      </div>
      <div class="footer">
        <p class="date">
          <fa-icon icon="clock" class="icon" />{{ post.publishedAt }}
        </p>
        <p class="pageview">
          {{ pageview }} Views
        </p>
      </div>
    </article>
    <aside class="extra related">
      <div class="heading">
        <h2><span class="border">関連記事</span></h2>
      </div>
      <RelatedArticles
        :tags="post.entities"
        :exclude-id="post.id"
      />
    </aside>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Context } from '~/types/context'
import { Post } from '~/types/post'
import { normalize, docPath } from '~/services/post'
import {
  getTitle,
  getSocialTitle,
  getSummary,
  removeTitle,
  getThumbnail,
  decodeEntities,
} from '~/plugins/typography'
import { getPageview } from '~/plugins/ga'

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
          if (
            !doc.exists ||
            r.post.isDeleted === true ||
            r.post.status !== 'published'
          ) {
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
    parentId() {
      return docPath(this.$data.post.id)
    },
    thumbnail() {
      return getThumbnail(this.$data.post.contentOriginal)
    },
    pageview() {
      return getPageview()
    },
  },
  mounted() {
    if (
      !this.$data.post.isPublic &&
      !this.isAuthenticated
    ) {
      this.$data.post = {}
      this.snack('ログインしてください')
      this.$router.push('/login')
    }
    if (
      !this.$data.post.isPublic &&
      this.isAuthenticated &&
      this.$store.state.auth.me.uid !== this.$data.post.owner.uid
    ) {
      this.$data.post = {}
      throw new Error('会員限定記事です')
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
.heading {
  margin-bottom: $gap;
  h1 {
    font-size: 2.2rem;
    line-height: 1.4;
    font-weight: 800;
    padding-top: 3rem;
  }
  h2 {
    font-size: 1.4rem;
    line-height: 1.4;
    font-weight: 800;
    padding-top: 2.2rem;
  }
  h1,
  h2 {
    .border {
      display: inline-block;
      padding-bottom: 2px;
      border-bottom: 4px solid $black;
    }
  }
  .extra & {
    margin-bottom: $gap / 2;
  }
}

.entities {
  margin-bottom: 30px;
}

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
    margin-right: 10px;
    .icon {
      margin-right: 5px;
    }
  }
}

.extra {
  padding-top: $gap;
}
</style>
