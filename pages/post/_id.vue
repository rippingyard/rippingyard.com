<template>

  <article>

    <Header :post="post"/>
    <section class="">
      
      <div class="container column is-8 is-offset-2">
        
        <article class="article">
          <div v-html="mainContent" class="wysiwyg"></div>
        </article>

        <AdBottom/>

      </div>

    </section>

  </article>
</template>

<script>

import { db } from '~/plugins/firebase'
import { getTitle, removeTitle } from '~/plugins/typography'
import Header from '~/components/molecules/PostHeader'
import AdBottom from '~/components/atoms/Ad/AdsensePostBottom'

export default {
  components: {
    Header,
    AdBottom,
  },
  computed: {
    getTitle() {
      return getTitle( this.post.content )
    },
    mainContent() {
      return removeTitle( this.post.content )
    }
  },
  data() {
    return {
      title: ''
    }
  },
  head: (context) => {
    return {
      title: getTitle( context.post.content )
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
        r.post.createdAt = null
        r.post.updatedAt = null
        r.post.owner = null
      })
      .catch((e) => {
        context.error({ statusCode: 404, message: 'ページが見つかりません' })
      })

    return r

  }

}
</script>
