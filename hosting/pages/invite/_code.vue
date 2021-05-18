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
        if (users.length > 1) {
          throw new Error('ページが見つかりません')
        }
        parent = users[0]
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
