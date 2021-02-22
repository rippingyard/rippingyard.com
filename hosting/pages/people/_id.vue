<template>
  <article class="block container">
    <Header />
    <div class="profile">
      <h1>{{ user.displayName }}</h1>
      <img v-if="user.avator" :src="user.avator" />
      <div v-html="user.profile"></div>
      <button class="button" @click="follow(user.id)">フォローする</button>
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { User } from '~/types/user'
import { getSummary } from '~/plugins/typography'

export default Vue.extend({
  async asyncData({ $fire, params, error, store }) {
    const r: {
      user?: Partial<User>
    } = {}
    const userId = params.id // TODO: 無毒化

    const cachedUser = await store.getters['user/one'](userId)
    if (!cachedUser) {
      await $fire.firestore
        .collection('users')
        .where('userName', '==', userId)
        .get()
        .then((qs: any) => {
          qs.forEach((doc: any) => {
            console.log('userDoc', doc)
            r.user = doc.data()
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

    console.log('oneUser', r.user)

    return r
  },
  data(): {
    user: Partial<User>
  } {
    return {
      user: {},
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'user/one',
    }),
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
    ...mapActions({
      follow: 'user/follow',
    }),
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
