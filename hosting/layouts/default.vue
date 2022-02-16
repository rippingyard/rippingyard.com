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
import { Post } from '~/types/post'
import { normalize, isPublic } from '~/services/post'

type DataType = {
  posts: Post[]
  isLoading: boolean
  unsubscribeHandler: any
}

export default Vue.extend({
  data(): DataType {
    return {
      posts: [],
      isLoading: true,
      unsubscribeHandler: null,
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.$nuxt.$loading.start()
    //   // setTimeout(() => this.$nuxt.$loading.finish(), 500)
    // })

    this.$data.unsubscribe = (this as any).$fire.firestore
      .collection('posts')
      .where('isPublic', '==', true)
      .where('status', '==', 'published')
      .where('type', 'in', ['note', 'article'])
      .limit(25)
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
                console.log('New Post', post)
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
  beforeDestroy() {
    this.$data.unsubscribe()
  },
})
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  margin: auto;
}
</style>
