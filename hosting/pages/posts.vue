<template>
  <section class="block container">
    <Header />
    <PostSimpleList v-if="posts" :posts="posts" />
    <div class="console">
      <button class="button expanded centered" @click="loadMore()">
        もっと読む
      </button>
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
  lastDate: any
}

const limit = 5

export default Vue.extend({
  data(): DataType {
    return {
      posts: [],
      lastDate: null,
    }
  },
  async created(): Promise<void> {
    await this.getPosts()
  },
  methods: {
    title(post: Post): string {
      return getTitle(post)
    },
    async loadMore(): Promise<void> {
      await this.getPosts((this as any).lastDate)
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
</style>
