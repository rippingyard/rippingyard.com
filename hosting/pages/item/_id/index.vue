<template>
  <main>
    <Header :image="thumbnail" />
    <div class="heading">
      <h2>{{ getTypeLabel() }}</h2>
      <h1>{{ getTitle }}</h1>
    </div>
    <div class="block">
      <div class="block main">
        <article class="post">
          <!-- <div v-if="post.parent" class="parent">
            <ItemCard :item="post.parent" />
          </div> -->
          <Content v-html="mainContent" />
          <AdsensePostBottom />
          <!-- <div v-if="post.owner" class="owner">
            <UserCard :user="post.owner" />
          </div> -->
          <CommentList :parent-id="parentId" />
          <!-- <CommentForm :parent-id="parentId" :is-public="post.isPublic" /> -->
          <!-- <div v-if="post.entities" class="entities">
            <EntitySimpleList :entities="post.entities" />
          </div> -->
          <div class="footer">
            <p class="date">
              <fa-icon icon="clock" class="icon" />{{ createdAt }}
            </p>
          </div>
        </article>
      </div>
      <div class="block sub sticky">
        <div class="block">
          <!-- <div v-if="item.owner" class="owner">
            <nuxt-link
              v-if="post.owner.avatar"
              :to="userlink(post.owner)"
              class="avatar"
              :style="avatar(post.owner)"
            />
            <p class="name">{{ post.owner.displayName }}</p>
            <p class="account">@{{ post.owner.userName }}</p>
          </div> -->
          <div class="social">
            <button class="button twitter is-wide" @click="openTweetForm">
              <fa-icon :icon="['fab', 'twitter']" class="icon" />ツイートする
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="block">
      <!-- <div v-if="post.items.length > 0" class="items">
        <ul>
          <li v-for="item of post.items" :key="item.id">
            <ItemCard :item="item" />
          </li>
        </ul>
      </div> -->
      <aside class="extra related">
        <div class="heading">
          <h2>
            <span class="border">「{{ getTitle }}」についての記事</span>
          </h2>
        </div>
        <PostSimpleList :posts="posts" />
      </aside>
      <!-- <aside class="extra related">
        <div class="heading">
          <h2><span class="border">関連記事</span></h2>
        </div>
        <RelatedArticles :tags="entities" :exclude-id="post.id" />
      </aside> -->
    </div>
  </main>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import { orderBy } from 'lodash'
import { Context } from '~/types/context'
import { Post } from '~/types/post'
import { Item } from '~/types/item'
import { User } from '~/types/user'
import { normalize, docPath, getTypeLabel, permalink } from '~/services/item'
import { normalize as normalizePost } from '~/services/post'
import {
  getSocialTitle,
  getSummary,
  removeTitle,
  getThumbnail,
  getI18nName,
} from '~/plugins/typography'

type DataType = {
  item: Partial<Item>
  posts: Partial<Post>[]
}

export default Vue.extend({
  async asyncData({ $fire, params, error, store }: Context): Promise<DataType> {
    const r: DataType = {
      item: {},
      posts: [],
    }
    const itemId = params.id
    r.item = store.state.item.items[itemId]
    // console.log('Item: Stored', store.state.item.items)
    if (r.item) {
      console.log('Item: Hit Cache', itemId)
    } else {
      console.log('Item: No Cache', itemId)
      await $fire.firestore
        .collection('items')
        .doc(itemId)
        .get()
        .then(async (doc: any) => {
          r.item = await normalize(doc.id, doc.data(), store)
          if (
            !doc.exists ||
            r.item.isDeleted === true ||
            r.item.status !== 'published'
          ) {
            r.item = {}
            throw new Error('ページが見つかりません')
          }
        })
        .catch((e: any) => {
          error({ statusCode: 404, message: e.message })
        })
    }

    const posts: Partial<Post>[] = []
    let promises: any[] = []
    if (r.item.id) {
      await $fire.firestore
        .collection('posts')
        .where('parent', '==', $fire.firestore.doc(`items/${r.item.id}`))
        .limit(50)
        .get()
        .then(async (qs: any) => {
          promises = qs.docs.map(async (doc: any) => {
            const post = doc.data()
            if (post.isDeleted === true) return
            const normalizedPost = await normalizePost(doc.id, post, store)
            return posts.push(normalizedPost)
          })
          await Promise.all(promises)
          r.posts = orderBy(posts, ['createdAt'], ['desc'])
        })
        .catch((e: any) => {
          error({ statusCode: 404, message: e.message })
        })
    }
    return r
  },
  data(): DataType {
    return {
      item: {},
      posts: [],
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
    getTitle(): string {
      if (!this.item?.name) return ''
      return getI18nName(this.item?.name)
    },
    getTitleWithType(): string {
      return `${this.getTitle}${this.getTypeLabel(true)}`
    },
    getSocialTitle(): string {
      return getSocialTitle(this.$data.item.content) + ' - rippingyard'
    },
    getSummary(): string {
      return getSummary(this.$data.item.content)
    },
    mainContent(): string {
      return removeTitle(this.$data.item.content)
    },
    parentId(): string {
      return docPath(this.$data.item.id)
    },
    thumbnail(): string {
      return getThumbnail(this.$data.item.contentOriginal)
    },
    createdAt(): string {
      if (!this.item) return ''
      if (typeof this.item.createdAt === 'string') return this.item.createdAt
      return dayjs(this.item.createdAt?.toDate()).format('YYYY-MM-DD HH:mm')
    },
    // entities(): string[] {
    //   const entities: string[] = []
    //   if (this.post.entities) entities.push(...this.post.entities)
    //   if (this.post.parent?.entities)
    //     entities.push(...this.post.parent?.entities)
    //   return entities
    // },
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
    getTypeLabel(isDecorated = false): string {
      if (!this.item?.type) return ''
      const label = getTypeLabel(this.item.type)
      return isDecorated ? ` [${label}]` : label
    },
    openTweetForm() {
      if (screen && this.item?.id) {
        const width: number = 560
        const height: number = 600
        const left: number = (screen.availWidth - width) / 2
        const top: number = (screen.availHeight - height) / 2
        const url: string = encodeURI(
          `https://www.rippingyard.com${permalink(this.item.id)}`
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
  head(): any {
    const title = this.getTitleWithType
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'description',
          name: 'description',
          content: getSummary(this.$data.item.content),
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: getSummary(this.$data.item.content),
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: getSummary(this.$data.item.content),
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.$data.item.sociallink,
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: this.$data.item.sociallink,
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
    padding-top: 1rem;
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
