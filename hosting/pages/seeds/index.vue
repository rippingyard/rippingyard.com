<template>
  <section class="frame">
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
import axios from 'axios'
import { filterContent } from '~/services/post'

export default {
  data() {
    return {
      title: '',
      seeds: [],
    }
  },
  computed: {
    mainContent() {
      return filterContent(this.getTitle + this.post.content)
    },
    getName() {
      switch (this.post.user) {
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
  async mounted() {
    const storage = this.$fire.storage
    const pathref = storage.ref('seeds/seeds.json')

    const url = await pathref.getDownloadURL()
    const res = await axios.get(url)

    const Seeds = res.data

    this.seeds = Seeds.reverse()

    // if (this.seeds.length < 1) {
    //   error({ statusCode: 404, message: 'ページが見つかりません' })
    // }
  },
  methods: {
    permalink(seed) {
      return `/seeds/${seed.slug}`
    },
  },
  head: () => {
    return {
      title: 'Seeds',
    }
  },
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
