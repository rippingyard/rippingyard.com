<template>
  <main class="block container">
    <Header />
    <h1 class="title">ようこそ！ripping yardへ！</h1>
    <div v-if="parent" class="information">
      <p>あなたは、<strong>{{ parent.displayName }}さん</strong>からの招待で、今ここにやってきました。</p>
    </div>
    <SignupForm :invited-by="parent.uid" />
  </main>
</template>
<script>
import { mapGetters } from 'vuex'
import { normalize as normalizeUser } from '~/services/user'
export default {
  async asyncData({ $fire, params, error }) {
    console.log('Code', params.code)
    let parent = null
    const users = []

    // TODO: params.codeをチェックする
    await $fire.firestore
      .collection('users')
      .where('code', '==', params.code)
      .get()
      .then(ss => {
        if (ss.docs.length === 0) {
          throw new Error('ページが見つかりません')
        }
        ss.forEach(doc => {
          users.push(doc.data())
        })
        parent = normalizeUser(users[0].uid, users[0])
        delete parent.followers
        delete parent.follows
        console.log('Parent', parent)
      })
      .catch(e => {
        error({ statusCode: 404, message: e.message })
      })

    return {
      parent
    }

  },
  data() {
    return {
      parent: null
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
  },
  created() {
    if (this.isAuthenticated) {
      this.$router.push('/home')
    }
  },
  head: () => {
    return {
      title: 'ようこそ！ripping yardへ',
      meta: [
        { hid: "robots", name: "robots", content: "noindex" },
      ]
    }
  },
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 10px;
}
.information {
  p {
    margin-bottom: $gap;
  }
}
</style>
