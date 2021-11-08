<template>
  <main class="block container is-wide">
    <Header :is-wide="true" />
    <ul class="masonry">
      <li v-for="post in firstPosts" :key="post.id">
        <PostItem :post="post" />
      </li>
    </ul>
    <AdsenseTopMiddle />
    <ul class="masonry">
      <li v-for="post in endPosts" :key="post.id">
        <PostItem :post="post" />
      </li>
    </ul>
    <AdsenseTopBottom />
    <ul class="masonry">
      <li v-for="post in articles" :key="post.id">
        <PostItem :post="post" />
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { orderBy } from 'lodash'
import { Context } from '~/types/context'
import { Post } from '~/types/post'
import { Item } from '~/types/item'
import { normalize, isPublic } from '~/services/post'

type DataType = {
  posts: Post[]
  articles: Post[]
  items: Item[]
  unsubscribeHandler: any
}

export default Vue.extend({
  async asyncData({ $fire, store }: Context) {
    const articles: Partial<Post>[] = []
    const qs = await $fire.firestore
      .collection('posts')
      .where('isPublic', '==', true)
      .where('status', '==', 'published')
      .where('type', '==', 'article')
      .limit(36)
      .orderBy('publishedAt', 'desc')
      .get()

    for (const doc of qs.docs) {
      const post = doc.data()
      if (isPublic(post)) {
        articles.push(await normalize(doc.id, post, store))
      }
    }

    return {
      articles,
    }
  },
  data(): DataType {
    return {
      posts: [],
      items: [],
      articles: [],
      unsubscribeHandler: null,
    }
  },
  computed: {
    sortedPosts() {
      return orderBy(this.$data.posts, ['createdAt'], ['desc'])
    },
    firstPosts(): Post[] {
      console.log('sortedPosts', this.sortedPosts)
      return this.sortedPosts.slice(0, 6)
    },
    endPosts(): Post[] {
      return this.sortedPosts.slice(6, this.$data.posts.length)
    },
  },
  mounted() {
    this.$data.unsubscribe = (this as any).$fire.firestore
      .collection('posts')
      .where('isPublic', '==', true)
      .where('status', '==', 'published')
      .where('type', '==', 'note')
      .onSnapshot({
        error: (e: any) => {
          console.log('firestore error', e)
        },
        next: (snapshot: any) => {
          snapshot.docChanges().forEach(async (change: any) => {
            let post: Post
            switch (change.type) {
              case 'added':
                console.log('Added!')
                post = change.doc.data()
                if (isPublic(post)) {
                  this.$data.posts.push(
                    await normalize(change.doc.id, post, this.$store)
                  )
                }
                break
              case 'modified':
              case 'removed':
              default:
                break
            }
          })
        },
      })
  },
  beforeDestroy() {
    this.$data.unsubscribe()
  },
})
</script>
<style lang="scss" scoped>
.masonry {
  & > li {
    margin-bottom: $gap;
    @include mobile {
      margin-bottom: $gap / 2;
    }
    > a {
      display: block;
      position: relative;
      padding: $gap / 2;
      height: 100%;
      border-radius: 2px;
      border: 8px solid $black;
      &:hover {
        border: 8px solid $black;
        cursor: pointer;
      }
      /deep/ h1 {
        padding-top: 0;
        font-size: 1.8rem;
      }
      /deep/ .footer {
        position: absolute;
        bottom: 30px;
      }
      @include mobile {
        // padding: $gap / 2 $gap;
        border: 6px solid $black;
        margin-bottom: $gap / 2;
      }
    }
  }
}
</style>
