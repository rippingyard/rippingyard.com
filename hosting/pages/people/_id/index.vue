<template>
  <article class="block container is-wide">
    <div class="block container">
      <Header />
      <ul class="tabs">
        <li
          :class="{ active: isActiveTab('posts') }"
          @click="activateTab('posts')"
        >
          記事
        </li>
        <li
          :class="{ active: isActiveTab('profile') }"
          @click="activateTab('profile')"
        >
          プロフィール
        </li>
      </ul>
      <div class="contents">
        <div v-if="isActiveTab('posts')" class="content">
          <ul class="list">
            <li v-for="post in posts" :key="post.id">
              <PostListItem :post="post" />
            </li>
          </ul>
        </div>
        <div v-if="isActiveTab('profile')" class="content">
          <div class="block">
            <h1>プロフィール</h1>
            <div class="wysiwyg" v-html="filterContent(user.profile)"></div>
          </div>
          <div v-if="createdate" class="block">
            <h1>登録日</h1>
            <p>{{ createdate }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="columns">
      <div class="column c30">
        <div class="profile">
          <p v-if="user.avatar" class="avatar" :style="avatar"></p>
          <h1 class="name">{{ user.displayName }}</h1>
          <p class="account">@{{ user.userName }}</p>
          <div class="wysiwyg" v-html="filterContent(user.profile)"></div>
          <FollowButton :user="user" />
        </div>
      </div>
      <div class="column c70">
        <ul class="tabs">
          <li
            :class="{ active: isActiveTab('posts') }"
            @click="activateTab('posts')"
          >
            記事
          </li>
          <li
            :class="{ active: isActiveTab('profile') }"
            @click="activateTab('profile')"
          >
            プロフィール
          </li>
        </ul>
        <div class="contents">
          <div v-if="isActiveTab('posts')" class="content">
            <ul class="list">
              <li v-for="post in posts" :key="post.id">
                <PostListItem :post="post" />
              </li>
            </ul>
          </div>
          <div v-if="isActiveTab('profile')" class="content">
            <div class="block">
              <h1>プロフィール</h1>
              <div class="wysiwyg" v-html="filterContent(user.profile)"></div>
            </div>
            <div v-if="createdate" class="block">
              <h1>登録日</h1>
              <p>{{ createdate }}</p>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import { orderBy, omit } from 'lodash'
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'
import { Context } from '~/types/context'
import { User } from '~/types/user'
import { Post } from '~/types/post'
import { normalize, filterContent } from '~/services/post'
import { getSummary } from '~/plugins/typography'

type DataType = {
  user?: Partial<User>
  posts?: Partial<Post>[]
  activeTab: string
}

export default Vue.extend({
  async asyncData({ $fire, params, store }: Context): Promise<any> {
    const r: Partial<DataType> = {}
    const userId = params.id // TODO: 無毒化

    const cachedUser = await store.getters['user/one'](userId)
    if (!cachedUser) {
      await $fire.firestore
        .collection('users')
        .where('userName', '==', userId)
        .get()
        .then((qs: any) => {
          qs.forEach((doc: any) => {
            r.user = omit(doc.data(), ['follows', 'followers', 'invitedBy'])
            store.commit('user/setUser', r.user)
          })
        })
    } else {
      console.log('Cached!')
      r.user = cachedUser
    }

    if (!r.user) {
      r.user = {}
      throw new Error('ページが見つかりません')
    }

    const posts: Partial<Post>[] = []
    let promises: any[] = []
    await $fire.firestore
      .collection('posts')
      .where('owner', '==', $fire.firestore.doc(`users/${r.user.uid}`))
      .where('isDeleted', '!=', true)
      .where('isPublic', '==', true)
      .limit(100)
      .orderBy('isDeleted', 'desc')
      .orderBy('publishedAt', 'desc')
      .get()
      .then((qs: any) => {
        promises = qs.docs.map(async (doc: any) => {
          const post = doc.data()
          if (post.isDeleted === true) return
          const normalizedPost = await normalize(doc.id, post, store)
          return posts.push(normalizedPost)
        })
      })
    await Promise.all(promises)

    r.posts = orderBy(posts, ['createdAt'], ['desc'])

    return r
  },
  data(): DataType {
    return {
      user: {},
      posts: [],
      activeTab: 'posts',
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'user/one',
    }),
    avatar(): string {
      return `background-image:url(${(this as any).user.avatar})`
    },
    createdate(): string {
      return this.$data.user.createdAt?.second
        ? dayjs(this.$data.user.createdAt.second).format('YYYY-MM-DD HH:mm')
        : ''
    },
  },
  // async mounted({
  //   post,
  //   setPost,
  //   getOwner,
  // }: {
  //   post: Post
  //   setPost: Function
  //   getOwner: Function
  // }) {
  //   setPost(post.id, post)
  //   if (post) {
  //     if (post.owner && post.owner.id) {
  //       post.owner = await getOwner(post.owner.id)
  //     }
  //   }
  // },
  methods: {
    activateTab(tab: string): void {
      this.activeTab = tab
    },
    isActiveTab(tab: string): boolean {
      return this.activeTab === tab
    },
    filterContent(content: string): string {
      return filterContent(content)
    },
  },
  head() {
    return {
      title: (this as any).user.displayName,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: (this as any).user.displayName,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: (this as any).user.displayName,
        },
        {
          hid: 'description',
          name: 'description',
          content: getSummary((this as any).user.profile),
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: getSummary((this as any).user.profile),
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: getSummary((this as any).user.profile),
        },
        // {
        //   hid: 'og:url',
        //   property: 'og:url',
        //   content: (this as any).user.sociallink,
        // },
        // {
        //   hid: 'twitter:url',
        //   name: 'twitter:url',
        //   content: (this as any).post.sociallink,
        // },
      ],
    }
  },
})
</script>
<style lang="scss" scoped>
.tabs {
  border-bottom: 4px solid $black;
  display: flex;
  > li {
    padding: 15px 25px;
    font-weight: 800;
    background-color: $white;
    border-top: 4px solid $black;
    border-left: 4px solid $black;
    &:last-child {
      border-right: 4px solid $black;
    }
    &:hover {
      cursor: pointer;
      background-color: $yellow;
    }
    &.active {
      background-color: $black;
      color: $white;
      &:hover {
        cursor: default;
      }
    }
  }
}
.content {
  border-left: 4px solid $black;
  border-right: 4px solid $black;
  border-bottom: 4px solid $black;
  .list {
    > li {
      border-bottom: 1px solid $black;
      &:last-child {
        border-bottom: none;
      }
    }
  }
  .block {
    padding: $gap;
    border-bottom: 1px solid $black;
    &:last-child {
      border-bottom: none;
    }
    h1 {
      font-size: 1rem;
      font-weight: 800;
      // border-bottom: 4px solid $black;
      margin-bottom: 40px;
    }
  }
}
.profile {
  padding-right: $gap;
  .name {
    font-size: 2rem;
    font-weight: 800;
  }
  .avatar {
    width: 180px;
    height: 180px;
    border-radius: 999999px;
    // border: 2px solid $yellow;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
  }
  @include mobile {
    padding-right: 0;
  }
}
</style>
