<template>
  <section class="block container">
    <Header />
    <ul>
      <li v-for="seed in seeds" :key="seed.id">
        <nuxt-link :to="permalink(seed)">
          <h2>{{ seed.title }}</h2>
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import { filterContent } from '~/services/post'
import Seeds from '~/assets/json/old/seeds.json'

export default {
  asyncData({ error }) {

    const r = {
      seeds: Seeds.reverse()
    }

    if( r.seeds.length < 1 ) {
      error({ statusCode: 404, message: 'ページが見つかりません' })
      return r
    }

    // r.post = {
    //   title: seed[0].title,
    //   content: seed[0].body,
    //   user: seed[0].user_id,
    //   publishedAt: seed[0].published_at,
    // }

    return r

  },
  data() {
    return {
      title: ''
    }
  },
  computed: {
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
  methods: {
    permalink(seed) {
      return `/seeds/${seed.slug}`
    },
  },
  head: () => {
    return {
      title: 'Seeds'
    }
  }

}
</script>
<style lang="scss" scoped>
ul {
  > li {
    border-top: 1px dashed $black;
    > a {
      padding: $gap 0;
      line-height: 1.3;
      display: block;
      > h2 {
        font-size: 2rem;
        font-weight: 800;
      }
    }
  }
}
</style>
