<template>
  <section class="block container">
    <Header />
    <PostSimpleList :posts="posts" />
    <div class="console">
      <button class="button expanded centered" @click="loadMore()">
        もっと読む
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { Timestamp } from 'firebase/firestore'
import { isPublic, normalize } from '~/services/post'
import { Context } from '~/types/context'
import { Post } from '~/types/post'
import { getTitle } from '~/plugins/typography'

type DataType = {
  posts: Partial<Post>[]
  lastDate: any
}

const limit = 25

export default {
  async asyncData({ $fire, store }: Context): Promise<DataType> {
    const posts: Partial<Post>[] = []
    let lastDate: any
    const qs = await $fire.firestore
      .collection('posts')
      .where('isDeleted', '==', false)
      .where('isPublic', '==', true)
      .where('status', '==', 'published')
      // .where('type', '==', 'article')
      .limit(limit)
      .orderBy('publishedAt', 'desc')
      .get()

    for (const doc of qs.docs) {
      const post = doc.data()
      lastDate = post.publishedAt
      if (isPublic(post)) {
        posts.push(await normalize(doc.id, post, store))
      }
    }
    return {
      posts,
      lastDate,
    }
  },
  data(): DataType {
    return {
      posts: [],
      lastDate: null,
    }
  },
  methods: {
    title(post: Post): string {
      return getTitle(post)
    },
    async loadMore(): Promise<void> {
      await this.getPosts(
        (this as any).$data.posts[(this as any).posts.length - 1].publishedAt
      )
    },
    async getPosts(startAt: string): Promise<void> {
      let q = (this as any).$fire.firestore
        .collection('posts')
        .where('isDeleted', '==', false)
        .where('isPublic', '==', true)
        .where('status', '==', 'published')
        // .where('type', 'in', ['article', 'note'])
        .limit(limit)
        .orderBy('publishedAt', 'desc')

      if (startAt) {
        q = q.startAfter(Timestamp.fromDate(new Date(startAt)))
      }

      const qs = await q.get()

      for (const doc of qs.docs) {
        const post: any = doc.data()
        ;(this as any).$data.lastDate = post.publishedAt
        if (isPublic(post)) {
          return (this as any).posts.push(
            await normalize(doc.id, post, (this as any).$store)
          )
        } else {
          // console.log('unPublished post', post)
        }
      }
    },
  },
  head(): any {
    return {
      title: 'Posts',
    }
  },
}
</script>
<style lang="scss" scoped>
.console {
  padding: $gap 0;
}
</style>
