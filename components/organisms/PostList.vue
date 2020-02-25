<template>
  <section class="section">
    <p class="menu-label is-hidden-touch">Posts</p>
    <div v-for="post in posts" :key="post.id">
      <PostCard :post=post />
    </div>
  </section>
</template>

<script>

import PostCard from '~/components/molecules/PostCard'
import Post from '~/models/Post'

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
    const post = new Post()
    this.posts = await post.limit(8).orderBy('createdAt', 'desc').items
  },

}

</script>