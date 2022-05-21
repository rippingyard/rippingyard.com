<template>
  <article class="block container">
    <Header :post="entity" />
    <div class="heading">
      <h1>{{ decodeEntity(entity.id) }}</h1>
    </div>
    <Content v-html="entity.content" />
    <CommentList :parent-id="parentId" />
    <CommentForm :parent-id="parentId" :is-public="entity.isPublic" />
    <AdsensePostBottom />
    <div class="posts">
      <PostSimpleList :posts="posts" />
    </div>
    <div class="footer">
      <p class="date">
        <fa-icon icon="clock" class="icon" />{{ entity.createdAt }}
      </p>
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { Context } from '~/types/context'
import { Post } from '~/types/post'
import { Entity } from '~/types/entity'
import {
  normalize,
  encodeEntity,
  decodeEntity,
  docPath,
} from '~/services/entity'
import { normalize as normalizePost } from '~/services/post'
import { getTitle, getSocialTitle, getSummary } from '~/plugins/typography'

export default Vue.extend({
  async asyncData({ $fire, params, error, store }: Context) {
    const r: {
      entity?: Partial<Entity>
      posts?: Partial<Post>[]
    } = {}
    const entityId = encodeEntity(params.id) // TODO: 無毒化
    // r.entity = store.state.post.posts[entityId]
    // console.log('Post: Stored', store.state.post.posts)
    // if (r.entity) {
    //   console.log('Post: Hit Cache', entityId)
    // } else {
    //   console.log('Post: No Cache', entityId)
    await $fire.firestore
      .collection('entities')
      .doc(entityId)
      .get()
      .then(async (doc: any) => {
        r.entity = await normalize(doc.id, doc.data(), store)
        if (!doc.exists || !r.entity.isPublic || r.entity.isDeleted === true) {
          r.entity = {}
          throw new Error('ページが見つかりません')
        }
      })
      .catch((e: any) => {
        error({ statusCode: 404, message: e.message })
      })
    // }

    let promises: any[] = []
    const posts: Partial<Post>[] = []
    await $fire.firestore
      .collection('posts')
      .where('isDeleted', '==', false)
      .where('isPublic', '==', true)
      .where('status', '==', 'published')
      .where('entities', 'array-contains', decodeEntity(entityId))
      .limit(100)
      .orderBy('createdAt', 'desc')
      .get()
      .then((qs: any) => {
        promises = qs.docs.map(async (doc: any) => {
          const post = doc.data()
          if (post.status !== 'published') return
          if (!post.isPublic) return
          if (post.isDeleted === true) return
          const normalizedPost = await normalizePost(doc.id, post, store)
          return posts.push(normalizedPost)
        })
      })
      .catch((e: any) => {
        error({ statusCode: 404, message: e.message })
      })

    await Promise.all(promises)

    r.posts = _.orderBy(posts, ['createdAt'], ['desc'])

    // console.log(r)

    return r
  },
  data(): {
    title: string
    // post: Partial<Post>
  } {
    return {
      title: '',
      // post: {},
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
    getTitle(): string {
      return getTitle(this.$data.entity.content)
    },
    getSocialTitle(): string {
      return getSocialTitle(this.$data.entity.content) + ' - rippingyard'
    },
    parentId(): string {
      return docPath(this.$data.entity.id)
    },
    // getSummary(): string {
    //   return getSummary(this.$data.entity.content)
    // },
    // mainContent(): string {
    //   return removeTitle(this.$data.entity.content)
    // },
    // thumbnail() {
    //   return getThumbnail(this.$data.entity.contentOriginal)
    // },
  },
  methods: {
    // setPost(id: string, post: Partial<Post>): void {
    //   return this.$store.commit('post/setPost', {
    //     id,
    //     post,
    //   })
    // },
    decodeEntity(entity: string) {
      return decodeEntity(entity)
    },
  },
  head() {
    return {
      title: decodeEntity(this.$data.entity.id),
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: decodeEntity(this.$data.entity.id),
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: decodeEntity(this.$data.entity.id),
        },
        {
          hid: 'description',
          name: 'description',
          content: getSummary(this.$data.entity.content),
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: getSummary(this.$data.entity.content),
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: getSummary(this.$data.entity.content),
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.$data.entity.sociallink,
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: this.$data.entity.sociallink,
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
  padding: 0 0 $gap 0;
  // border-top: 1px solid $gray-black;
  > h1 {
    font-size: 3rem;
    font-weight: 800;
  }
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
    .icon {
      margin-right: 5px;
    }
  }
}
</style>
