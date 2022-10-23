<template>
  <div class="frame">
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
      <RelatedArticles :tags="post.entities" :exclude-id="post.id" />
    </aside>
  </div>
</template>

<script>
import axios from 'axios'
import { filterContent } from '~/services/post'

export default {
  data() {
    return {
      title: '',
      post: {},
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
    const slug = this.$route.params.slug

    if (!slug) this.redirect('/')

    const storage = this.$fire.storage
    const pathref = storage.ref('seeds/seeds.json')

    const url = await pathref.getDownloadURL()
    const res = await axios.get(url)

    const Seeds = res.data

    const seed = Seeds.find(s => {
      return s.slug === slug
    })

    if (!seed) {
      this.error({ statusCode: 404, message: 'ページが見つかりません' })
    }

    this.post = {
      title: seed.title,
      content: seed.body,
      user: seed.user_id,
      publishedAt: seed.published_at,
    }
  },
  head: context => {
    return {
      title: context.post.title,
    }
  },
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
