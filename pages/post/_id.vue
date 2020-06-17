<template>

  <article>

    <Header :post="post"/>

    <section class="">
      
      <div class="container column is-8 is-offset-2">
        
        <article v-if="getTitle" class="article">
          <div v-html="mainContent" class="wysiwyg"></div>
          <ShareButtons :href="post.sociallink" :title="getSocialTitle" />
          <AdBottom/>
          <!-- <PostList :limit="15" /> -->
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

        

      </div>

    </section>

  </article>
</template>

<script>

import { mapGetters } from 'vuex'
import { db } from '~/plugins/firebase'
import { normalize } from '~/store/post'
import { getTitle, getSummary, removeTitle } from '~/plugins/typography'
import Header from '~/components/molecules/PostHeader'
import AdBottom from '~/components/atoms/Ad/AdsensePostBottom'
import ShareButtons from '~/components/molecules/Share/ShareButtons'
// import PostList from '~/components/organisms/PostList'

export default {
  components: {
    Header,
    AdBottom,
    ShareButtons,
    // PostList,
  },
  data() {
    return {
      title: '',
    }
  },
  computed: {
    ...mapGetters({
      getOwner: 'user/owner',
    }),
    // setPost(id, post) {
    //   return this.$store.commit('post/setPost', {
    //     id: id,
    //     post: post
    //   })
    // },
    getTitle() {
      return getTitle( this.post.content )
    },
    getSocialTitle() {
      return getTitle( this.post.content ) + ' - rippingyard'
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
        { hid: 'og:url', property: 'og:url', content: context.post.sociallink },
        { hid: 'twitter:url', name: 'twitter:url', content: context.post.sociallink },
      ]
    }
  },
  async asyncData({ params, error, store }) {

    const r = {}
    const postId = params.id// TODO: 無毒化 

    r.post = store.state.post.posts[postId]

    console.log('Post: Stored', store.state.post.posts)

    if( r.post ) {

      console.log('Post: Hit Cache', postId)

    } else {

      console.log('Post: No Cache', postId)

      await db
        .collection('posts')
        .doc(postId)
        .get()
        .then(doc => {

          r.post = normalize(doc.id, doc.data())

          r.post.owner = {
            id: r.post.owner.id,
          }

        })
        .catch((e) => {
          error({ statusCode: 404, message: 'ページが見つかりません' })
        })
    }

    return r

  },
  async mounted() {

    this.setPost(this.post.id, this.post)

    if( this.post ) {
      if( this.post.owner.id ) {
        this.post.owner = await this.getOwner(this.post.owner.id)
      }
    }

  },
  methods: {
    setPost(id, post) {
      return this.$store.commit('post/setPost', {
        id: id,
        post: post
      })
    },
  },

}
</script>
