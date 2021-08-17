<template>
  <main class="block container is-wide">
    <Header :is-wide="true" />
    <ul class="masonry">
      <li v-for="post in firstPosts" :key="post.id">
        <PostItem :post="post" />
      </li>
    </ul>
    <AdsenseTopMiddle />
    <ul class="masonry">
      <li v-for="post in endPosts" :key="post.id">
        <PostItem :post="post" />
      </li>
    </ul>
    <AdsenseTopBottom />
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
      .limit(36)
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
    
    const allPosts = _.orderBy(posts, ['createdAt'], ['desc'])
    const firstPosts = allPosts.slice(0, 6)
    const endPosts = allPosts.slice(6, allPosts.length)

    return {
      firstPosts,
      endPosts,
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
    @include mobile {
      margin-bottom: $gap / 2;
    }
    > a {
      display: block;
      position: relative;
      padding: $gap / 2;
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
