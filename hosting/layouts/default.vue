<template>
  <div class="wrapper">
    <Nav />
    <HeaderMobile />
    <div class="frame">
      <Nuxt />
      <Footer />
    </div>
    <ActivityModal />
    <Loading :is-loading="isLoading" />
    <Snack />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { Post } from '~/types/post'
import { normalize, isPublic } from '~/services/post'

type DataType = {
  posts: Post[]
  isLoading: boolean
  unsubscriber: any
}

export default Vue.extend({
  data(): DataType {
    return {
      posts: [],
      isLoading: true,
      unsubscriber: null,
    }
  },
  mounted(): void {
    this.unsubscriber = (this as any).$fire.firestore
      .collection('posts')
      .where('isDeleted', '==', false)
      .where('isPublic', '==', true)
      .where('status', '==', 'published')
      .where('type', 'in', ['note', 'article'])
      .orderBy('publishedAt', 'desc')
      .limit(30)
      .onSnapshot({
        error: (e: any) => {
          console.error('firestore error', e)
          this.isLoading = false
        },
        next: (snapshot: any) => {
          snapshot.docChanges().forEach(async (change: any) => {
            let post: Post
            switch (change.type) {
              case 'added':
                post = change.doc.data()
                // console.log('New Post', post)
                if (isPublic(post)) {
                  this.$store.commit(
                    'global/setPost',
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
          this.isLoading = false
        },
      })
  },
  beforeDestroy(): void {
    this.unsubscriber()
  },
  methods: {
    ...mapActions({
      saveSecret: 'secret/save',
    }),
  },
})
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  margin: auto;
}
</style>
