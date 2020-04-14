<template>
  <section class="section">
    <p class="menu-label is-hidden-touch">Latest Posts</p>
    <div v-for="post in posts" :key="post.id">
      <PostCard :post=post />
    </div>
  </section>
</template>

<script>

import { db } from '~/plugins/firebase'
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
    // const loading = this.$buefy.loading.open({
    //   'is-full-page': false
    // })

    await db
      .collection('timelines')
      .doc('public')
      .collection('posts')
      .limit(this.limit)
      .orderBy('createdAt', 'desc')
      .get()
      .then(qs => {
        qs.forEach(doc => {
          this.posts.push(doc.data())
        })
      })

    // loading.close()
  },

}

</script>