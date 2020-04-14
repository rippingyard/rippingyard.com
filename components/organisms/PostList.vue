<template>
  <section class="section">
    <p class="menu-label is-hidden-touch">Latest Posts</p>
    <div v-for="post in posts" :key="post.id">
      <PostCard :post=post />
    </div>
  </section>
</template>

<script>

import Timeline from '~/models/Timeline'
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

    const ref = new Timeline()
    ref.db = ref.ref().doc('public').collection('posts').limit(this.limit).orderBy('createdAt', 'desc')
    this.posts = await ref.items

    loading.close()
  },

}

</script>