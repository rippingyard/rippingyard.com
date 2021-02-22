<template>
  <form @submit.prevent="signup">
    <div class="field">
      <label>アカウント名</label>
      <input
        v-model="userName"
        placeholder="アカウント名を入力"
        class="input"
      />
    </div>
    <div class="field">
      <label>メールアドレス</label>
      <input
        v-model="email"
        type="email"
        placeholder="メールアドレスを入力"
        class="input"
      />
    </div>
    <div class="field">
      <label>パスワード</label>
      <input
        v-model="password"
        type="password"
        placeholder="パスワードを入力"
        class="input"
      />
    </div>
    <div class="buttons">
      <button class="button">新規登録</button>
    </div>
  </form>
</template>

<script>
// import { db, auth } from '~/plugins/firebase'
// // import User from '~/models/User'

export default {
  data() {
    return {
      displayName: '',
      userName: '',
      email: '',
      password: '',
    }
  },
  methods: {
    async signup() {
      // const $buefy = this.$buefy
      // const $router = this.$router

      const existance = await this.$fire.firestore
        .collection('users')
        .where('userName', '==', this.userName)
        .get()

      if (!existance.empty) {
        return alert('既に存在するユーザーです')
      }

      const result = await this.$fire.auth.createUserWithEmailAndPassword(
        this.email,
        this.password
      )

      await this.$fire.firestore.collection('users').doc(result.user.uid).set({
        id: result.user.uid,
        displayName: this.userName,
        userName: this.userName,
        role: 'stranger',
        isBanned: false,
        isDeleted: false,
      })

      //   .then(async result => {
      //     // console.log(result)

      //     result.user.updateProfile({
      //       displayName: this.userName,
      //     })

      //     $buefy.notification.open({
      //       duration: 5000,
      //       message: 'ユーザーの登録が完了しました',
      //       position: 'is-bottom-right',
      //       type: 'is-success',
      //     })

      this.$router.push('home')
      //   })
      //   .catch(function (e) {
      //     console.log(e.code, e.message)
      //     $buefy.notification.open({
      //       duration: 5000,
      //       message: e.message,
      //       position: 'is-bottom-right',
      //       type: 'is-danger',
      //     })
      //   })
    },
  },
}
</script>
