<template>

  <article>

    <section class="postheader">
      <Belt/>

      <div class="container column is-8 is-offset-2">
        <Title :title="getTitle"/>

        <ul class="data">
          <li class="datetime"><strong>DATE</strong> {{ post.publishedAt }}</li>
          <li class="by"><strong>POSTED BY</strong> {{ getName }}</li>
        </ul>
      </div>

    </section>
    <section class="">
      
      <div class="container column is-8 is-offset-2">
        
        <article class="article">
          <div v-html="mainContent" class="wysiwyg"></div>
          <AdBottom/>
        </article>

      </div>

    </section>

  </article>
</template>

<script>

import _ from 'lodash'
// import { db } from '~/plugins/firebase'
import axios from 'axios'
import { getTitle, removeTitle } from '~/plugins/typography'
import { filterContent } from '~/store/post'
import AdBottom from '~/components/atoms/Ad/AdsensePostBottom'
// import Seeds from '~/assets/json/old/seeds.json'
import Title from '~/components/atoms/PostTitle'
import Belt from '~/components/atoms/Belt/Readable'

export default {
  components: {
    AdBottom,
    Title,
    Belt,
  },
  data() {
    return {
      title: ''
    }
  },
  computed: {
    getTitle() {
      return this.post.title
    },
    mainContent() {
      return this.post.content
    },
    getName() {
      switch(this.post.user) {
        case 37:
          return 'labofromjmq'

        case 24:
          return 'compuedit'
        
        case 4:
          return 'joynesan'

        case 3:
          return 'komugi'

        case 2:
          return 'mcatm'
        
        default:
          return 'ripping yard'
      }
    },
  },
  head: (context) => {
    return {
      title: context.post.title
    }
  },
  async asyncData({ params, redirect, error }) {

    const r = {}

    const slug = params.slug

    if( !slug ) redirect('/')

    await axios.get('https://storage.googleapis.com/ry-prd/old/seeds.json').then(res => {

      const seed = _.filter(res.data, o => {
        // console.log('Item:', o[0]);
        return o.slug === slug
      })

      if( seed.length < 1 ) {
        // console.log(slug)
        error({ statusCode: 404, message: 'ページが見つかりません' })
        return r
      }

      console.log('Seed:', seed[0].title)

      r.post = {
        title: seed[0].title,
        content: filterContent(seed[0].body),
        user: seed[0].user_id,
        publishedAt: seed[0].published_at,
      }

    }).catch(e => {
      console.log(e)
      error({ statusCode: 404, message: 'ページが見つかりません' })
      return r
    })

    return r

  }

}
</script>

<style scoped lang="scss">

.postheader {

  width: 100%;
  padding: 80px 40px 40px;
  // background-color: $orange;

  @include until($tablet) {
    padding: 50px 40px 20px;
  }

  .column {
    padding: 0 15px;

    @include until($tablet) {
      padding: 0;
    }
  }

  .data {
    margin-top: 40px;
    color: $black;
    font-size: 10px;
    position: relative;

    &:before {
      content: "";
      width: 28px;
      height: 1px;
      background-color: $black;
      position: absolute;
      top: -10px;
      left: 0;
    }

    strong {
      font-weight: 800;
      padding-right: 10px;
    }
  }
  
}

</style>
