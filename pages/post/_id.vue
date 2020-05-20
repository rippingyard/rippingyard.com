<template>

  <article>

    <Header :post="post"/>

    <section class="">
      
      <div class="container column is-8 is-offset-2">
        
        <article v-if="getTitle" class="article">
          <div v-html="mainContent" class="wysiwyg"></div>
        </article>

        <article v-else class="article no-title">
          <div class="article-container">
            <div v-html="mainContent" class="wysiwyg"></div>
            <div class="article-footer">
              <ul class="data">
                <li class="datetime"><strong>DATE</strong> {{ post.publishedAt }}</li>
                <li v-if="post.owner" class="by"><strong>POSTED BY</strong> {{ post.owner.displayName }}</li>
                <li v-if="post.length" class="length"><strong>LENGTH</strong> {{ post.length }}</li>
              </ul>
            </div>
          </div>
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
import { getTitle, getSummary, removeTitle, getLength } from '~/plugins/typography'
import Header from '~/components/molecules/PostHeader'
import AdBottom from '~/components/atoms/Ad/AdsensePostBottom'

export default {
  components: {
    Header,
    AdBottom,
  },
  data() {
    return {
      title: '',
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
    getSummary() {
      return getSummary( this.post.content )
    },
    mainContent() {
      return removeTitle( this.post.content )
    }
  },
  head: (context) => {
    return {
      title: getTitle( context.post.content ),
      meta: [
        { hid: 'og:title', property: 'og:title', content: getTitle( context.post.content ) },
        { hid: 'twitter:title', name: 'twitter:title', content: getTitle( context.post.content ) },
        { hid: 'description', name: 'description', content: getSummary( context.post.content ) },
        { hid: 'og:description', property: 'og:description', content: getSummary( context.post.content ) },
        { hid: 'twitter:description', name: 'twitter:description', content: getSummary( context.post.content ) },
      ]
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

        // const owner = 

        // if( !owner ) {
        //   await db.collection('users').doc(this.post.owner.id).get().then(doc => {
        //     owner = doc.data()
        //     this.$store.commit('user/setUser', owner)
        //   })
        // }

        // r.post.owner = owner
        
        // this.ownerId = r.post.owner.id
        // console.log('owner', r.post.owner)
        // r.post.owner = await this.getOwner(ownerId)
        // context.owner = this.getOwner(ownerId)

        r.post.owner = {
          id: r.post.owner.id,
        }

      })
      .catch((e) => {
        context.error({ statusCode: 404, message: 'ページが見つかりません' })
      })

    return r

  },
  async mounted() {

    if( this.post.owner.id ) {
      this.post.owner = await this.getOwner(this.post.owner.id)
    }

  },

}
</script>
