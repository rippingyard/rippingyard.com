<template>
  <section class="section">
    <p class="menu-label is-hidden-touch">Posts</p>
    <div v-for="post in posts" :key="post.id">
      <PostCard :post=post />
    </div>
  </section>
</template>

<script>

import Post from '~/models/Post'
import PostCard from '~/components/molecules/PostCard'

export default {

  components: {
    PostCard,
  },

  props: {
    limit: {
      type: Number,
      default: 12,
    }
  },

  data() {
    return {
      posts: []
    }
  },

  async created(context) {
    const loading = this.$buefy.loading.open()

    const postRef = new Post()
    postRef.db = postRef.ref().limit(this.limit).orderBy('createdAt', 'desc')
    this.posts = await postRef.items

    loading.close()
  },

}

</script>