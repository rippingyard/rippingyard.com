<template>
  <section class="section">
    <p class="menu-label is-hidden-touch">Latest Posts</p>
    <div class="list">
      <div class="list-container">
        <b-loading :active.sync="isLoading" :is-full-page="false"></b-loading>
        <PostRow v-for="post in posts" :key="post.id" :post=post />
      </div>
    </div>
  </section>
</template>

<script>

import { db } from '~/plugins/firebase'
import PostRow from '~/components/molecules/PostRow'

export default {
  components: {
    PostRow,
  },
  props: {
    limit: {
      type: Number,
      default: 12,
    }
  },
  data() {
    return {
      posts: [],
      isLoading: false,
    }
  },
  async created(context) {
    // const loading = this.$buefy.loading.open({
    //   'is-full-page': false
    // })

    this.isLoading = true

    await db
      .collection('timelines')
      .doc('public')
      .collection('posts')
      .limit(this.limit)
      .orderBy('createdAt', 'desc')
      .get()
      .then(qs => {
        qs.forEach(doc => {
          // console.log(doc.id)
          this.posts.push(Object.assign(
            doc.data(),
            {
              id: doc.id,
              permalink: '/post/' + doc.id,
            }
          ))
        })
      })

    this.isLoading = false

  },

}

</script>

<style lang="scss">

.loading-overlay {
  position: relative;
  height: 400px;

  .loading-background {
    background-color: $white;
  }
}

</style>