<template>
  <main class="container">
    <Header />
    <ul class="list">
      <li v-for="post in posts" :key="post.id">
        <Content v-html="post.content" />
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { DocumentData } from '@firebase/firestore-types'
import { TPost, normalize } from '~/services/post'

export default Vue.extend({
  async asyncData({ $fire }) {
    const posts: DocumentData[] = []
    await $fire.firestore
      .collection('timelines')
      .doc('public')
      .collection('posts')
      .limit(100)
      .orderBy('createdAt', 'desc')
      .get()
      .then(qs => {
        console.log('snapshot', qs)
        qs.forEach(doc => {
          return posts.push(normalize(doc.id, doc.data() as TPost))
        })
      })
    return {
      posts,
    }
  },
  data() {
    return {
      posts: [],
      isLoading: false,
    }
  },
})
</script>
