<template>
  <div class="block container">
    <article>
      <Header />
      <Content v-html="mainContent" />
      <AdsensePostBottom />
      <div class="footer">
        <p class="date">
          <fa-icon icon="clock" class="icon" />{{ post.publishedAt }}
        </p>
      </div>
    </article>
    <aside class="extra related">
      <div class="heading">
        <h2><span class="border">関連記事</span></h2>
      </div>
      <RelatedArticles
        :tags="post.entities"
        :exclude-id="post.id"
      />
    </aside>
  </div>
</template>

<script>

import _ from 'lodash'
import { filterContent } from '~/services/post'
import Seeds from '~/assets/json/old/seeds.json'

export default {
  asyncData({ params, redirect, error }) {

    const r = {}

    const slug = params.slug

    if (!slug) redirect('/')

    console.log(slug)

    const seed = _.filter(Seeds, o => { return o.slug === slug })

    if( seed.length < 1 ) {
      error({ statusCode: 404, message: 'ページが見つかりません' })
      return r
    }

    console.log(seed)

    r.post = {
      title: seed[0].title,
      content: seed[0].body,
      user: seed[0].user_id,
      publishedAt: seed[0].published_at,
    }

    return r

  },
  data() {
    return {
      title: ''
    }
  },
  computed: {
    getTitle() {
      return `<h1>${this.post.title}</h1>`
    },
    mainContent() {
      return filterContent(this.getTitle + this.post.content)
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
  }

}
</script>
<style lang="scss" scoped>
.heading {
  margin-bottom: $gap;
  h1 {
    font-size: 2.2rem;
    line-height: 1.4;
    font-weight: 800;
    padding-top: 3rem;
  }
  h2 {
    font-size: 1.4rem;
    line-height: 1.4;
    font-weight: 800;
    padding-top: 2.2rem;
  }
  h1,
  h2 {
    .border {
      display: inline-block;
      padding-bottom: 2px;
      border-bottom: 4px solid $black;
    }
  }
  .extra & {
    margin-bottom: $gap / 2;
  }
}

.footer {
  padding-top: 80px;
  font-size: 0.9rem;
  color: $gray-black;
  font-weight: 800;
  position: relative;
  &::before {
    content: '';
    width: 18px;
    height: 1px;
    background-color: $gray-black;
    top: 70px;
    left: 0;
    display: block;
    position: absolute;
  }
  > p {
    display: inline-block;
    .icon {
      margin-right: 5px;
    }
  }
}
</style>
