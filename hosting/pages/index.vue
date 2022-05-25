<template>
  <main>
    <div v-if="isLoading" class="block container loading">
      <IconLoading color="yellow" />
    </div>
    <div v-else>
      <Header />
      <ul class="masonry">
        <li v-for="post in firstPosts" :key="post.id">
          <PostItem :post="post" />
        </li>
      </ul>
      <AdsenseTopMiddle />
      <ul class="masonry">
        <li v-for="post in endPosts" :key="post.id">
          <PostItem :post="post" />
        </li>
      </ul>
      <AdsenseTopBottom />
      <PostSimpleList :posts="articles" />
      <div class="console">
        <nuxt-link to="/posts" class="button expanded centered">
          すべての記事を読む
        </nuxt-link>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { orderBy } from 'lodash'
import { Context } from '~/types/context'
import { Post } from '~/types/post'
import { Item } from '~/types/item'
import { normalize, isPublic } from '~/services/post'

type DataType = {
  articles: Post[]
  items: Item[]
  unsubscribeHandler: any
}

export default Vue.extend({
  async asyncData({ $fire, store }: Context) {
    const articles: Partial<Post>[] = []
    const qs = await $fire.firestore
      .collection('posts')
      .where('isDeleted', '==', false)
      .where('isPublic', '==', true)
      .where('status', '==', 'published')
      .where('type', '==', 'article')
      .limit(36)
      .orderBy('publishedAt', 'desc')
      .get()

    for (const doc of qs.docs) {
      const post = doc.data()
      if (isPublic(post)) {
        articles.push(await normalize(doc.id, post, store))
      }
    }

    return {
      articles,
    }
  },
  data(): DataType {
    return {
      items: [],
      articles: [],
      unsubscribeHandler: null,
    }
  },
  computed: {
    posts(): Post[] {
      return this.$store.state.global.posts
    },
    sortedPosts(): Post[] {
      return orderBy(this.posts, ['createdAt'], ['desc'])
    },
    firstPosts(): Post[] {
      return this.sortedPosts.slice(0, 6)
    },
    endPosts(): Post[] {
      return this.sortedPosts.slice(6, this.posts.length)
    },
    isLoading(): boolean {
      return !this.$store.state.global.posts
    },
  },
})
</script>
<style lang="scss" scoped>
.skyscraper {
  display: none;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  > img {
    max-width: 100%;
  }
}
.masonry {
  @include until-desktop {
    margin-left: $gap / 2;
    margin-right: $gap / 2;
  }
  & > li {
    margin-bottom: $gap;
    @include until-desktop {
      margin-bottom: $gap / 2;
    }
    > a {
      display: block;
      position: relative;
      height: 100%;
      &:hover {
        cursor: pointer;
      }
      /deep/ h1 {
        padding-top: 0;
        font-size: 1.8rem;
      }
      /deep/ .footer {
        position: absolute;
        bottom: 30px;
      }
      @include mobile {
        margin-bottom: $gap / 2;

        /deep/ h1 {
          padding-bottom: $gap / 2;
        }
      }
    }
  }
}
.loading {
  width: 100%;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-content: center;
}
.console {
  padding: $gap 0 0;
  @include until($desktop) {
    margin: 0 $gap / 2 0;
  }
}
</style>
