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

import { mapGetters } from 'vuex'
import moment from 'moment'
import { db } from '~/plugins/firebase'
import { getTitle, removeTitle, getLength } from '~/plugins/typography'
import Header from '~/components/molecules/PostHeader'
import AdBottom from '~/components/atoms/Ad/AdsensePostBottom'

export default {
  components: {
    Header,
    AdBottom,
  },
  data() {
    return {
      title: ''
    }
  },
  computed: {
    ...mapGetters({
      normalize: 'post/normalize',
      getOwner: 'user/owner',
    }),
    getTitle() {
      return getTitle( this.post.content )
    },
    mainContent() {
      return removeTitle( this.post.content )
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
        r.post.publishedAt = moment(r.post.publishedAt.toDate()).format('YYYY-MM-DD HH:mm:ss')
        r.post.createdAt = null
        r.post.updatedAt = null
        r.post.parent = null
        r.post.length = getLength( r.post.content )

        // const owner = this.getOwner(this.post.owner.id)

        // if( !owner ) {
        //   await db.collection('users').doc(this.post.owner.id).get().then(doc => {
        //     owner = doc.data()
        //     this.$store.commit('user/setUser', owner)
        //   })
        // }

        // r.post.owner = owner

        r.post.owner = null

      })
      .catch((e) => {
        context.error({ statusCode: 404, message: 'ページが見つかりません' })
      })

    return r

  }

}
</script>
