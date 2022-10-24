<template>
  <ul class="">
    <li v-for="post in posts" :key="post.id">
      <LogItem :post="post" />
    </li>
  </ul>
</template>
<script lang="ts">
import Vue from 'vue'
import { isPublic, normalize } from '~/services/post'
import { Post } from '~/types/post'

type DataType = {
  posts: Post[]
}

export default Vue.extend({
  data(): DataType {
    return {
      posts: [],
    }
  },
  async created() {
    // const posts: Post[] = []
    const ql = await (this as any).$fire.firestore
      .collection('posts')
      .where('isDeleted', '==', false)
      .where('isPublic', '==', true)
      .where('status', '==', 'published')
      .where('type', '==', 'log')
      .limit(50)
      .orderBy('publishedAt', 'desc')
      .get()

    for (const doc of ql.docs) {
      const post = doc.data()
      if (isPublic(post)) {
        this.posts.push(await normalize(doc.id, post, this.$store))
      }
    }
    console.log('logList', this.posts)
  },
})
</script>
<style lang="scss" scoped>
li {
  margin-bottom: $gap / 2;
}
</style>