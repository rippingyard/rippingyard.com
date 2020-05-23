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
import { normalize } from '~/store/post'
import PostRow from '~/components/molecules/PostRow'

export default {
  components: {
    PostRow,
  },
  props: {
    limit: {
      type: Number,
      default: 12,
    },
    owner: {
      type: String,
      default: null,
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

    let tlHandler = db
      .collection('timelines')
      .doc('public')
      .collection('posts')
    
    if( this.owner ) tlHandler = tlHandler.where('owner', '==', db.collection('users').doc(this.owner))

    tlHandler = tlHandler
      .limit(this.limit)
      .orderBy('createdAt', 'desc')

    await tlHandler.get()
      .then(qs => {
        qs.forEach(doc => {
          // console.log(doc.id)
          // console.log(doc.data())
          this.posts.push(normalize(doc.id, doc.data()))
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