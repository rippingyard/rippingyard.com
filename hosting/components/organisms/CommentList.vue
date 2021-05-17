<template>
  <div class="container">
    <ul class="comments">
      <li
        v-for="comment in comments"
        :key="comment.id"
        class="comment"
      >
        <div class="body" v-html="comment.content"></div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    parentId: {
      type: String,
      default: undefined,
    },
  },
  data(): {
    comments: any[],
    unsubscribe: any
  } {
    return {
      comments: [],
      unsubscribe: () => {}
    }
  },
  async mounted(): Promise<void> {
    this.unsubscribe = await (this as any).$fire.firestore
      .collection('comments')
      .orderBy('createdAt', 'asc')
      // .get()
      .onSnapshot((ss: any) => {
        this.comments = []
        ss.forEach((d: any) => {
          console.log('Snapshot Comment', d.data())
          this.comments.push(d.data())
        })
        // promises = qs.docs.map(async (doc: any) => {
        //   const post = doc.data()
        //   if (post.isDeleted === true) return
        //   const normalizedPost = await normalize(doc.id, post, store)
        //   return posts.push(normalizedPost)
        // })
      })
    // await Promise.all(promises)
  },
  destroyed() {
    this.unsubscribe()
  },
})
</script>
<style lang="scss" scoped>
.comments {
  margin-bottom: 40px;
}
.comment {
  padding: 20px 0;
  border-bottom: 1px solid $gray-black;
}
</style>