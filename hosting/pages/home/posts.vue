<template>
  <section class="columns is-bordered">
    <div class="column c20">
      <ManageNav />
    </div>
    <div class="column c80">
      <PostTable :data="posts" :check="toggleCheck" />
      <div class="console">
        <button
          class="button"
          :class="{ 'is-disabled': !isChecked }"
          @click="deletePosts()"
        >
          削除
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'
// import { DocumentData } from '@firebase/firestore-types'
import { normalize } from '~/services/post'

import { getTitle } from '~/plugins/typography'

export default {
  layout: 'manage',
  middleware: ['auth'],
  async asyncData({ $fire, store }) {
    const posts = []

    const db = $fire.firestore
      .collection('posts')
      .where('type', '==', 'article')
      .where(
        'owner',
        '==',
        $fire.firestore.collection('users').doc(store.state.auth.me.id)
      )

    // if (isTimeline) {
    //   db = $fire.firestore
    //     .collection('timelines')
    //     .doc('public')
    //     .collection('posts')
    // } else {
    //   db = $fire.firestore.collection('posts')
    // }

    let promises = []
    await db
      .limit(1000)
      .orderBy('createdAt', 'desc')
      .get()
      .then(qs => {
        promises = qs.docs.map(async doc => {
          const post = doc.data()
          if (post.isDeleted === true) return
          const normalizedPost = await normalize(doc.id, post, store)
          return posts.push(normalizedPost)
        })
      })

    await Promise.all(promises)

    console.log('Posts:', posts)

    return {
      posts: _.orderBy(posts, ['createdAt'], ['desc']),
    }
  },
  data() {
    return {
      posts: [],
      checkedPosts: [],
      // deletedItems: [],
      // isLoading: false,
    }
  },
  computed: {
    isChecked() {
      return this.checkedPosts.length > 0
    },
  },
  methods: {
    ...mapActions({
      deletePost: 'post/delete',
    }),
    getTitle(content) {
      return getTitle(content)
    },
    getEditLink(id) {
      return `/home/post/edit/${id}`
    },
    isActive(id) {
      return !_.find(this.deletedItems, o => {
        return o.id === id
      })
    },
    toggleCheck(id) {
      if (!this.checkedPosts.includes(id)) {
        this.checkedPosts.push(id)
      } else {
        this.checkedPosts = this.checkedPosts.filter(p => p !== id)
      }
    },
    async deletePosts() {
      // console.log('postIds:', this.checkedPosts)
      // console.log(this)

      if (this.checkedPosts.length === 0) return

      const promises = []

      this.checkedPosts.map(id => promises.push(this.deletePost(id)))

      await Promise.all(promises)

      // this.deletedItems.push({
      //   id,
      //   status: 'deleted',
      // })

      // return this.deletePost({
      //   id,
      //   notification: this.$buefy.notification,
      // })

      if (location) location.reload()
    },
  },
}
</script>
<style lang="scss" scoped>
.console {
  padding: 20px;
}
</style>
