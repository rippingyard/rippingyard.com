<template>
  <main>
    <ManageNav />
    <div v-if="!isEmpty" class="page">
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
    <div v-else>
      <div class="empty">
        <h2>ログがありません</h2>
      </div>
    </div>
  </main>
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
  // layout: 'manage',
  middleware: ['auth'],
  async asyncData({ $fire, store }: Context) {
    const posts: Partial<Post>[] = []

    const db = $fire.firestore
      .collection('posts')
      .where('type', '==', 'log')
      .where(
        'owner',
        '==',
        $fire.firestore.doc(`users/${store.state.auth.me.uid}`)
      )

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
    }
  },
  computed: {
    isEmpty() {
      return this.$data.posts.length === 0
    },
    isChecked() {
      return this.$data.checkedPosts.length > 0
    },
  },
  methods: {
    ...mapActions({
      deletePost: 'post/delete',
      saveActivity: 'activity/save',
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
        this.$data.checkedPosts = this.$data.checkedPosts.filter(
          (p: string) => p !== id
        )
      }
    },
    async deletePosts() {
      if (this.$data.checkedPosts.length === 0) return

      const promises: any[] = []

      this.$data.checkedPosts.map((id: string) => {
        promises.push((this as any).deletePost(id))
        promises.push(
          (this as any).saveActivity({
            type: 'post:delete',
            status: 'succeeded',
          })
        )
      })

      await Promise.all(promises)

      this.snack('記事を削除しました')

      if (location) location.reload()
    },
  },
  head: () => {
    return {
      title: '記事一覧 - HOME',
    }
  },
})
</script>
<style lang="scss" scoped>
.page {
  margin-top: $gap;
  border: 1px solid $black;
}
.console {
  padding: 20px;
  margin: 0;
}
.empty {
  border-top: 1px solid $black;
  padding: $gap * 3 $gap;
  text-align: center;
  > h2 {
    font-size: 3rem;
    font-weight: 800;
  }
  > p {
    font-size: 1.4rem;
    > a {
      color: $blue;
    }
  }
}
</style>
