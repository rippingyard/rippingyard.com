<template>
  <main class="">
    <ul class="tabs">
      <li :class="{ active: isActiveTab('posts') }" @click="activateTab('posts')">
        記事
      </li>
      <li :class="{ active: isActiveTab('profile') }" @click="activateTab('profile')">
        プロフィール
      </li>
    </ul>
    <div class="contents">
      <div v-if="isActiveTab('posts')" class="content">
        <OrganismPostList :component="CardPostSimple" :limit="10" />
      </div>
      <div v-if="user && isActiveTab('profile')" class="profile">
        <div class="heading">
          <h1 class="name">{{ user.displayName }}</h1>
          <p class="account">@{{ user.userName }}</p>
        </div>
        <div class="block">
          <BlockWysiwyg :content="user.profile || ''" />
        </div>
        <!-- <div v-if="createdate" class="block">
            <h1>登録日</h1>
            <p>{{ createdate }}</p>
          </div> -->
      </div>
    </div>
    <!-- <article class="block container is-wide">
      <div class="block container">
        <Header />


      </div>
    </article> -->
  </main>
</template>
<script lang="ts" setup>
// import Vue from 'vue'
// import { orderBy, omit } from 'lodash'
// import dayjs from 'dayjs'
// import { mapGetters } from 'vuex'
// import { Context } from '~/types/context'
// import { User } from '~/types/user'
// import { Post } from '~/types/post'
// import { normalize, filterContent } from '~/services/post'
// import { getSummary } from '~/plugins/typography'

import dayjs from 'dayjs';
import { User } from '~~/schemas/user';
import CardPostSimple from '~/components/card/PostSimple.vue';

type TabType = 'posts' | 'profile';

type Props = {
  user: User;
}

const props = defineProps<Props>();

const user = computed(() => props.user || null)

// type DataType = {
//   user?: Partial<User>
//   posts?: Partial<Post>[]
//   activeTab: string
// }

// export default Vue.extend({
//   async asyncData({ $fire, params, store }: Context): Promise<any> {
//     const r: Partial<DataType> = {}
//     const userId = params.id // TODO: 無毒化

//     const cachedUser = await store.getters['user/one'](userId)
//     if (!cachedUser) {
//       await $fire.firestore
//         .collection('users')
//         .where('userName', '==', userId)
//         .get()
//         .then((qs: any) => {
//           qs.forEach((doc: any) => {
//             r.user = omit(doc.data(), ['follows', 'followers', 'invitedBy'])
//             store.commit('user/setUser', r.user)
//           })
//         })
//     } else {
//       // console.log('Cached!')
//       r.user = cachedUser
//     }

//     if (!r.user) {
//       r.user = {}
//       throw new Error('ページが見つかりません')
//     }

//     const posts: Partial<Post>[] = []
//     let promises: any[] = []
//     await $fire.firestore
//       .collection('posts')
//       .where('owner', '==', $fire.firestore.doc(`users/${r.user.uid}`))
//       .where('isDeleted', '!=', true)
//       .where('isPublic', '==', true)
//       .where('status', '==', 'published')
//       .limit(100)
//       .orderBy('isDeleted', 'desc')
//       .orderBy('publishedAt', 'desc')
//       .get()
//       .then((qs: any) => {
//         promises = qs.docs.map(async (doc: any) => {
//           const post = doc.data()
//           if (post.isDeleted === true) return
//           const normalizedPost = await normalize(doc.id, post, store)
//           return posts.push(normalizedPost)
//         })
//       })
//     await Promise.all(promises)

//     r.posts = orderBy(posts, ['createdAt'], ['desc'])

//     return r
//   },
//   data(): DataType {
//     return {
//       user: {},
//       posts: [],

const activeTab = ref<TabType>('posts')

//     }
//   },
//   computed: {
//     ...mapGetters({
//       getUser: 'user/one',
//     }),
//     avatar(): string {
//       return `background-image:url(${(this as any).user.avatar})`
//     },
// const createdate = computed(() => user.value?.createdAt ? dayjs(user.value.createdAt.toDate()).format('YYYY-MM-DD HH:mm')
//   : '');

watch(user, () => {
  console.log('user.value.createdAt', user.value.createdAt);
})

const activateTab = (tab: TabType): void => {
  activeTab.value = tab;
};
const isActiveTab = (tab: TabType): boolean => activeTab.value === tab;
</script>
<style lang="scss" scoped>
.tabs {
  border-bottom: 4px solid $black;
  display: flex;

  >li {
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
  // border-left: 4px solid $black;
  // border-right: 4px solid $black;
  // border-bottom: 4px solid $black;

  .list {
    >li {
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

  .heading {
    padding: $gap * 0.5 0 $gap;
  }

  .name {
    font-size: 2rem;
    font-weight: 800;
  }

  .account {
    font-size: 0.8rem;
    color: $black-transparent-80;
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
