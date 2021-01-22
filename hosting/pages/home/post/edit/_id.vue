<template>
  <section class="columns">
    <div class="column c20">
      <ManageNav />
    </div>
    <main class="column c80">
      <div class="heading">
        <h2>記事編集</h2>
      </div>
      <div class="form">
        <PostForm :post="post" submit-label="記事更新" />
      </div>
    </main>
  </section>
</template>

<script>
export default {
  layout: 'manage',
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
            id: r.post.owner.id,
          }
        }

        console.log('before filter', r.post)
      })
      .catch(e => {
        error({
          statusCode: 404,
          message: e.message || 'ページが見つかりません',
        })
      })

    console.log('return value', r)

    return r
  },
  mounted() {
    if (!this.$isAuthenticated(this.$store)) {
      // this.$buefy.notification.open({
      //   duration: 5000,
      //   message: 'ログインしてください',
      //   position: 'is-bottom-right',
      //   type: 'is-danger',
      //   hasIcon: false,
      // })
      this.$router.push('/login')
    }
  },
  head: () => {
    return {
      title: '記事編集 - HOME',
    }
  },
}
</script>
<style lang="scss" scoped>
.heading {
  h2 {
    font-size: 0.8rem;
    font-weight: 800;
    line-height: 1;
    color: $gray-black;
    background-color: $gray;
    // border-bottom: 4px solid $gray-black;
    padding: 30px;
    display: inline-block;
  }
}
.form {
  padding: 10px 60px 60px;
}
</style>
