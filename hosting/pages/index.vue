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
import { DocumentData } from '@firebase/firestore-types'
import { Post } from '~/types/post'
import { normalize } from '~/services/post'

export default Vue.extend({
  async asyncData({ $fire }) {
    const posts: Partial<Post>[] = []
    await $fire.firestore
      .collection('timelines')
      .doc('public')
      .collection('posts')
      .limit(100)
      .orderBy('createdAt', 'desc')
      .get()
      .then(qs => {
        qs.forEach(doc => {
          return posts.push(normalize(doc.id, doc.data() as DocumentData))
        })
      })
    return {
      posts,
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
    margin-bottom: 40px;
    > a {
      display: block;
      position: relative;
      padding: 30px;
      height: 100%;
      border-radius: 2px;
      border: 8px solid $black;
      &:hover {
        border: 8px solid $black;
      }
      /deep/ h1 {
        padding-top: 0;
        font-size: 1.8rem;
      }
      /deep/ .footer {
        position: absolute;
        bottom: 30px;
      }
    }
  }
}
</style>
