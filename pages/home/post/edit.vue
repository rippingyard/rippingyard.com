<template>
  <section class="main-content columns">
    <div class="container column is-8 is-offset-2">
      <section class="section">
        <PostForm :post-id="postId" :post="post" submit-text="記事更新" />
      </section>
    </div>
  </section>
</template>

<script>

import { db } from '~/plugins/firebase'
import { normalize } from '~/store/post'
import PostForm from '~/components/molecules/PostForm'

export default {
  components: {
    PostForm,
  },
  head: () => {
    return {
      title: '投稿編集 - HOME'
    }
  },
  async asyncData({ query, error, store }) {

    const r = {}

    // if( !query.id ) throw '記事が見つかりません'

    const postId = query.id// TODO: 無毒化

    if( !postId ) return r

    r.postId = postId

    await db
      .collection('posts')
      .doc(postId)
      .get()
      .then(doc => {
        
        r.post = doc.data()

        if( r.post.createdAt ) r.post.createdAt = r.post.createdAt.toDate()
        if( r.post.publishedAt ) r.post.publishedAt = r.post.publishedAt.toDate()
        r.post.updatedAt = null

        if( r.post.owner ) {
          r.post.owner = {
            id: r.post.owner.id,
          }
        }

        console.log('before filter', r.post)

      })
      .catch((e) => {
        error({ statusCode: 404, message: 'ページが見つかりません' })
      })

    return r

  },
  mounted() {

    if( !this.$isAuthenticated(this.$store) ) {
      this.$buefy.notification.open({
        duration: 5000,
        message: 'ログインしてください',
        position: 'is-bottom-right',
        type: 'is-danger',
        hasIcon: false
      })
      this.$router.push('/signin')
    }

  },
}
</script>
