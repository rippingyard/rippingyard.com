<template>
  <PostSimpleList :posts="posts" />
</template>
<script lang="ts">
import Vue from 'vue'
import _ from 'lodash'
import { Post } from '~/types/post'
import { normalize as normalizePost } from '~/services/post'
import { decodeEntity } from '~/services/entity'
export default Vue.extend({
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
    excludeId: {
      type: String,
      default: '',
    },
  },
  async fetch() {
    const selectedTags: string[] = _.sampleSize(
      _.uniq(this.tags),
      10
    ) as string[]

    let promises: any[] = []
    const limit = 15
    const posts: Partial<Post>[] = []

    if (selectedTags.length > 0) {
      await (this as any).$fire.firestore
        .collection('posts')
        .where('isPublic', '==', true)
        .where('isDeleted', '!=', true)
        .where('status', '==', 'published')
        .where(
          'entities',
          'array-contains-any',
          selectedTags.map((e: string) => decodeEntity(e))
        )
        .limit(limit)
        .orderBy('isDeleted', 'desc')
        .orderBy('publishedAt', 'desc')
        .get()
        .then((qs: any) => {
          // console.log('Size by Tags', qs.size)
          promises = qs.docs
            .filter((doc: any) => doc.id !== this.excludeId)
            .map(async (doc: any) => {
              return posts.push(
                await normalizePost(doc.id, doc.data(), this.$store)
              )
            })
        })
        .catch((e: any) => {
          console.error('Error', e)
          // error({ statusCode: 404, message: e.message })
        })
    }

    if (promises.length < 1) {
      await (this as any).$fire.firestore
        .collection('posts')
        .where('isPublic', '==', true)
        .where('isDeleted', '!=', true)
        .where('status', '==', 'published')
        .limit(limit)
        .orderBy('isDeleted', 'desc')
        .orderBy('publishedAt', 'desc')
        .get()
        .then((qs: any) => {
          // console.log('Brand New Posts Size', qs.size)
          promises = qs.docs.map(async (doc: any) => {
            return posts.push(
              await normalizePost(doc.id, doc.data(), this.$store)
            )
          })
        })
        .catch((e: any) => {
          console.error('Error', e)
          // error({ statusCode: 404, message: e.message })
        })
    }

    if (promises.length < 1) return

    await Promise.all(promises)

    this.$data.posts = _.sampleSize(posts, 10) as any[]
  },
  data() {
    return {
      posts: [],
    }
  },
})
</script>