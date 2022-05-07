<template>
  <section class="block container">
    <Header />
    <template v-if="!isLoading">
      <PostSimpleList v-if="posts" :posts="posts" />
      <div class="console">
        <Button :on-click="loadMore" :is-loading="isLoadingMore">
          もっと読む
        </Button>
      </div>
    </template>
    <div v-else class="loading">
      <IconLoading size="large" color="black" />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { isPublic, normalize } from '~/services/post'
import { Post } from '~/types/post'
import { getTitle } from '~/plugins/typography'

type DataType = {
  posts: Partial<Post>[]
  isLoading: boolean
  isLoadingMore: boolean
  lastDate: any
}

const limit = 25

export default Vue.extend({
  data(): DataType {
    return {
      posts: [],
      isLoading: true,
      isLoadingMore: false,
      lastDate: null,
    }
  },
  async created(): Promise<void> {
    await this.getPosts()
    this.isLoading = false
  },
  methods: {
    title(post: Post): string {
      return getTitle(post)
    },
    async loadMore(): Promise<void> {
      this.isLoadingMore = true
      await this.getPosts((this as any).lastDate)
      this.isLoadingMore = false
    },
    async getPosts(startAt: any = undefined): Promise<void> {
      console.log('startAt', startAt)
      let q = (this as any).$fire.firestore
        .collection('posts')
        .where('isDeleted', '==', false)
        .where('isPublic', '==', true)
        .where('status', '==', 'published')
        // .where('type', 'in', ['article', 'note'])
        .limit(limit)
        .orderBy('publishedAt', 'desc')

      if (startAt) q = q.startAfter(startAt)

      const qs = await q.get()

      qs.forEach(async (doc: any) => {
        const post: any = doc.data()
        if (isPublic(post)) {
          console.log('post', post)
          ;(this as any).$data.lastDate = post.publishedAt
          return (this as any).posts.push(
            await normalize(doc.id, post, (this as any).$store)
          )
        }
      })
    },
  },
  head(): any {
    return {
      title: 'Posts',
    }
  },
})
</script>
<style lang="scss" scoped>
.console {
  padding: $gap 0;
}
.loading {
  min-height: 320px;
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>
