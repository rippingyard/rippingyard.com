<template>
  <main class="block container is-wide">
    <Header :is-wide="true" />
    <ul class="masonry">
      <li v-for="post in posts" :key="post.id">
        <PostItem :post="post" />
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import _ from 'lodash'
import { Context } from '~/types/context'
import { Post } from '~/types/post'
import { normalize } from '~/services/post'

export default Vue.extend({
  async asyncData({ $fire, store }: Context) {
    const posts: Partial<Post>[] = []
    let promises: any[] = []
    await $fire.firestore
      .collection('timelines')
      .doc('public')
      .collection('posts')
      .limit(100)
      .orderBy('publishedAt', 'desc')
      .get()
      .then((qs: any) => {
        promises = qs.docs.map(async (doc: any) => {
          const post = doc.data()
          if (post.isDeleted === true) return
          const normalizedPost = await normalize(doc.id, post, store)
          return posts.push(normalizedPost)
        })
      })
    await Promise.all(promises)
    // console.log('promises:', promises)
    // console.log('me', store.state.auth.follows)
    return {
      posts: _.orderBy(posts, ['createdAt'], ['desc']),
    }
  },
  data() {
    return {
      posts: [],
    }
  },
})
</script>
<style lang="scss" scoped>
.masonry {
  & > li {
    margin-bottom: $gap;
    > a {
      display: block;
      position: relative;
      padding: $gap;
      height: 100%;
      border-radius: 2px;
      border: 8px solid $black;
      &:hover {
        border: 8px solid $black;
        cursor: pointer;
      }
      /deep/ h1 {
        padding-top: 0;
        font-size: 1.8rem;
      }
      /deep/ .footer {
        position: absolute;
        bottom: 30px;
      }
      @include mobile {
        // padding: $gap / 2 $gap;
        border: 6px solid $black;
        margin-bottom: $gap / 2;
      }
    }
  }
}
</style>
