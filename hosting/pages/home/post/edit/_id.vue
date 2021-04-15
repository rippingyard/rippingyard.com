<template>
  <section class="columns">
    <div class="column c20">
      <ManageNav />
    </div>
    <main class="column c80">
      <ManageHeading label="記事編集" />
      <div class="form">
        <PostForm :post="post" submit-label="記事更新" />
      </div>
    </main>
  </section>
</template>

<script>
export default {
  layout: 'manage',
  middleware: ['auth'],
  async asyncData({ $fire, params, error }) {
    const r = {}

    // if( !query.id ) throw '記事が見つかりません'

    const postId = params.id // TODO: 無毒化

    if (!postId) return r

    r.postId = postId

    await $fire.firestore
      .collection('posts')
      .doc(postId)
      .get()
      .then(doc => {
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

        // console.log('before filter', r.post)
      })
      .catch(e => {
        error({
          statusCode: 404,
          message: e.message || 'ページが見つかりません',
        })
      })

    // console.log('return value', r)

    return r
  },
  mounted() {},
  head: () => {
    return {
      title: '記事編集 - HOME',
    }
  },
}
</script>
<style lang="scss" scoped>
.form {
  padding: 10px 60px 60px;
}
</style>
