<template>
  <main class="page">
    <ManageHeading label="記事編集" />
    <div class="form">
      <PostForm :post="post" submit-label="記事更新" />
    </div>
  </main>
</template>
<script lang="ts">
import Vue from 'vue'

type DataType = {
  postId?: string
  post?: any
}

export default Vue.extend({
  // layout: 'manage',
  middleware: ['auth'],
  async asyncData({ $fire, params, error }: any) {
    const r: DataType = {}

    // if( !query.id ) throw '記事が見つかりません'

    const postId = params.id // TODO: 無毒化

    if (!postId) return r

    r.postId = postId

    await $fire.firestore
      .collection('posts')
      .doc(postId)
      .get()
      .then((doc: any) => {
        r.post = doc.data()
        r.post.id = doc.id

        if (r.post.createdAt) r.post.createdAt = r.post.createdAt.toDate()
        if (r.post.publishedAt) r.post.publishedAt = r.post.publishedAt.toDate()
        r.post.updatedAt = null

        if (r.post.owner) {
          r.post.owner = {
            uid: r.post.owner.id,
          }
        }
      })
      .catch((e: any) => {
        error({
          statusCode: 404,
          message: e.message || 'ページが見つかりません',
        })
      })

    return r
  },
  mounted() {},
  head: () => {
    return {
      title: '記事編集 - HOME',
    }
  },
})
</script>
<style lang="scss" scoped>
.page {
  margin-top: $gap;
  border: 1px solid $gray-black;
}
.form {
  padding: 10px 60px 60px;
}
</style>
