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

<script lang="ts">
import Vue from 'vue'
import _ from 'lodash'
import { mapActions } from 'vuex'
import { normalize } from '~/services/post'
import { Context } from '~/types/context'
import { Post } from '~/types/post'

import { getTitle } from '~/plugins/typography'

export default Vue.extend({
  layout: 'manage',
  middleware: ['auth'],
  async asyncData({ $fire, store }: Context) {
    const posts: Partial<Post>[] = []

    console.log('TEST', store.state.auth.me)

    const db = $fire.firestore
      .collection('posts')
      .where('type', '==', 'article')
      .where(
        'owner',
        '==',
        $fire.firestore.doc(`users/${store.state.auth.me.uid}`)
      )
    
    console.log('u', `users/${store.state.auth.me.uid}`)

    // if (isTimeline) {
    //   db = $fire.firestore
    //     .collection('timelines')
    //     .doc('public')
    //     .collection('posts')
    // } else {
    //   db = $fire.firestore.collection('posts')
    // }

    let promises: any[] = []
    await db
      .limit(1000)
      .orderBy('createdAt', 'desc')
      .get()
      .then((qs: any) => {
        promises = qs.docs.map(async (doc: any) => {
          const post = doc.data()
          if (post.isDeleted === true) return
          const normalizedPost = await normalize(doc.id, post, store)
          return posts.push(normalizedPost)
        })
      })

    await Promise.all(promises)

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
      return this.$data.checkedPosts.length > 0
    },
  },
  methods: {
    ...mapActions({
      deletePost: 'post/delete',
    }),
    getTitle(content: string): string {
      return getTitle(content)
    },
    getEditLink(id: string): string {
      return `/home/post/edit/${id}`
    },
    isActive(id: string): boolean {
      return !_.find(this.$data.deletedItems, o => {
        return o.id === id
      })
    },
    toggleCheck(id: string) {
      if (!this.$data.checkedPosts.includes(id)) {
        this.$data.checkedPosts.push(id)
      } else {
        this.checkedPosts = this.checkedPosts.filter(p => p !== id)
      }
    },
    async deletePosts() {

      if (this.checkedPosts.length === 0) return

      const promises: any[] = []

      this.checkedPosts.map(id => promises.push(this.deletePost(id)))

      await Promise.all(promises)

      this.snack('記事を削除しました')

      if (location) location.reload()
    },
  },
})
</script>
<style lang="scss" scoped>
.console {
  padding: 20px;
}
</style>
