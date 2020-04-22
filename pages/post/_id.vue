<template>
  <section class="main-content columns">

    <div class="container column is-8 is-offset-2">
      <PostCard :post=post />
    </div>

  </section>

</template>

<script>

import { db } from '~/plugins/firebase'
import PostCard from '~/components/molecules/PostCard'

export default {
  components: {
    PostCard,
  },
  data() {
    return {
      title: '',
    }
  },
  head: (context) => {
    return {
      title: context.post.content.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')
    }
  },
  async asyncData(context) {

    const r = {}

    await db
      .collection('posts')
      .doc(context.params.id)
      .get()
      .then(doc => {
        r.post = Object.assign(
          doc.data(),
          {
            id: doc.id,
            permalink: '/post/' + doc.id,
          }
        )
      })
      .catch((e) => {
        context.error({ statusCode: 404, message: 'ページが見つかりません' })
      })

    return r

  }

}
</script>
