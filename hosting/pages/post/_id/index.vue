<template>
  <main>
    <Header :image="thumbnail" />
    <div class="heading">
      <h1>{{ getTitle }}</h1>
    </div>
    <div class="block">
      <div class="block main">
        <article class="post">
          <div v-if="post.parent" class="parent">
            <ItemCard :item="post.parent" />
          </div>
          <Content v-html="mainContent" />
          <AdsensePostBottom />
          <div v-if="post.owner" class="owner">
            <UserCard :user="post.owner" />
          </div>
          <CommentList :parent-id="parentId" />
          <CommentForm :parent-id="parentId" :is-public="post.isPublic" />
          <div v-if="post.entities" class="entities">
            <EntitySimpleList :entities="post.entities" />
          </div>
          <div class="footer">
            <p class="date">
              <fa-icon icon="clock" class="icon" />{{ post.publishedAt }}
            </p>
          </div>
        </article>
      </div>
      <div class="block sub sticky">
        <div class="block">
          <div v-if="post.owner" class="owner">
            <nuxt-link
              v-if="post.owner.avatar"
              :to="userlink(post.owner)"
              class="avatar"
              :style="avatar(post.owner)"
            />
            <p class="name">{{ post.owner.displayName }}</p>
            <p class="account">@{{ post.owner.userName }}</p>
          </div>
          <div class="social">
            <button class="button twitter is-wide" @click="openTweetForm">
              <fa-icon :icon="['fab', 'twitter']" class="icon" />ツイートする
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="block">
      <div v-if="post.items.length > 0" class="items">
        <ul>
          <li v-for="item of post.items" :key="item.id">
            <ItemCard :item="item" />
          </li>
        </ul>
      </div>
      <aside class="extra related">
        <div class="heading">
          <h2><span class="border">関連記事</span></h2>
        </div>
        <RelatedArticles :tags="entities" :exclude-id="post.id" />
      </aside>
    </div>
  </main>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Context } from '~/types/context'
import { Post } from '~/types/post'
import { Item } from '~/types/item'
import { User } from '~/types/user'
import { normalize, docPath } from '~/services/post'
import {
  getTitle,
  getSocialTitle,
  getSummary,
  removeTitle,
  getThumbnail,
  getI18nName,
} from '~/plugins/typography'

export default Vue.extend({
  async asyncData({ $fire, params, error, store }: Context) {
    const r: {
      post?: Partial<Post>
    } = {}
    const postId = params.id
    r.post = store.state.post.posts[postId]
    console.log('Post: Stored', store.state.post.posts)
    if (r.post) {
      console.log('Post: Hit Cache', postId)
    } else {
      console.log('Post: No Cache', postId)
      await $fire.firestore
        .collection('posts')
        .doc(postId)
        .get()
        .then(async (doc: any) => {
          console.log(doc.id, doc.data())
          r.post = await normalize(doc.id, doc.data(), store)
          if (
            !doc.exists ||
            r.post.isDeleted === true ||
            r.post.status !== 'published'
          ) {
            r.post = {}
            throw new Error('ページが見つかりません')
          }
        })
        .catch((e: any) => {
          error({ statusCode: 404, message: e.message })
        })
    }
    return r
  },
  data(): {
    // title: string
    post: Partial<Post>
  } {
    return {
      // title: '',
      post: {},
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
    getTitle(): string {
      return getTitle(this.$data.post)
    },
    getSocialTitle(): string {
      return getSocialTitle(this.$data.post.content) + ' - rippingyard'
    },
    getSummary(): string {
      return getSummary(this.$data.post.content)
    },
    mainContent(): string {
      return removeTitle(this.$data.post.content)
    },
    parentId(): string {
      return docPath(this.$data.post.id)
    },
    thumbnail(): string {
      return getThumbnail(this.$data.post.contentOriginal)
    },
    entities(): string[] {
      const entities: string[] = []
      if (this.post.entities) entities.push(...this.post.entities)
      if (this.post.parent?.entities)
        entities.push(...this.post.parent?.entities)
      return entities
    },
  },
  mounted() {
    if (!this.$data.post.isPublic && !this.isAuthenticated) {
      this.$data.post = {}
      this.snack('ログインしてください')
      this.$router.push('/login')
    }
    if (
      !this.$data.post.isPublic &&
      this.isAuthenticated &&
      this.$store.state.auth.me.uid !== this.$data.post.owner.uid
    ) {
      this.$data.post = {}
      throw new Error('会員限定記事です')
    }
  },
  methods: {
    setPost(id: string, post: Partial<Post>): void {
      return this.$store.commit('post/setPost', {
        id,
        post,
      })
    },
    itemName(item: Item): string {
      if (!item.name) return ''
      return getI18nName(item.name)
    },
    userlink(user: User) {
      return `/people/${user.userName}`
    },
    avatar(user: User) {
      return `background-image:url(${user.avatar})`
    },
    openTweetForm() {
      if (screen) {
        const width: number = 560
        const height: number = 600
        const left: number = (screen.availWidth - width) / 2
        const top: number = (screen.availHeight - height) / 2
        const url: string = encodeURI(
          `https://www.rippingyard.com${this.post.permalink}`
        )
        const text: string = encodeURI(`${this.getTitle} - ripping yard`)
        window.open(
          `https://twitter.com/share?url=${url}&text=${text}`,
          'tweet',
          `innerWidth=${width},innerHeight=${height},left=${left},top=${top},resizable=no`
        )
      }
    },
  },
  head() {
    return {
      title: getTitle(this.$data.post),
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: getTitle(this.$data.post),
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: getTitle(this.$data.post),
        },
        {
          hid: 'description',
          name: 'description',
          content: getSummary(this.$data.post.content),
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: getSummary(this.$data.post.content),
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: getSummary(this.$data.post.content),
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.$data.post.sociallink,
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: this.$data.post.sociallink,
        },
        // TODO: 他サーバーにあるものをOGImageとして使うのはいかがなものか
        // {
        //   hid: 'og:image',
        //   property: 'og:image',
        //   content: this.thumbnail || 'https://www.rippingyard.com/img/ogimage.png',
        // },
        // {
        //   hid: 'twitter:image',
        //   name: 'twitter:image',
        //   content: this.thumbnail || 'https://www.rippingyard.com/img/ogimage.png',
        // },
      ],
    }
  },
})
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
  @include until($desktop) {
    max-width: $mainSize;
    padding: 0 ($gap / 2);
    margin: 0 auto $gap / 2;
    h1 {
      padding-top: $gap / 2;
    }
  }
}

.parent {
  margin: 0 0 $gap / 2;
  @include until($desktop) {
    margin: 0 $gap / 2 $gap / 2;
  }
}

.items {
  margin-bottom: 25px;
}

.entities {
  margin-bottom: 30px;
  @include until($desktop) {
    padding: 0 $gap / 2;
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

  @include until($desktop) {
    padding-left: $gap / 2;
    padding-right: $gap / 2;
    &::before {
      left: $gap / 2;
    }
  }
}

.extra {
  padding-top: $gap;
}

.owner {
  border-bottom: 1px solid $gray-black;
  padding-bottom: $gap / 2;
  margin-bottom: $gap / 2;
  .avatar {
    display: block;
    margin: 0 auto 10px;
    width: 80px;
    height: 80px;
    border-radius: 999999px;
    border: 4px solid $black;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .name {
    text-align: center;
    font-weight: 800;
    font-size: 1.2rem;
    line-height: 1.2;
  }

  .account {
    text-align: center;
    font-weight: 400;
    font-size: 0.8rem;
    color: $gray-black;
  }
}

.social {
  .button {
    text-align: center;
    padding: 10px 0;
    border: 0;
    color: $white;
    font-weight: 800;
    font-size: 0.9rem;
    .icon {
      margin-right: 5px;
    }
  }
}
</style>
