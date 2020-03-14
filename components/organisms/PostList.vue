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

  data() {
    return {
      posts: null
    }
  },

  async created(context) {
    const loading = this.$buefy.loading.open()
    this.posts = await (new Post()).limit(8).orderBy('createdAt', 'desc').items
    loading.close()
  },

}

</script>