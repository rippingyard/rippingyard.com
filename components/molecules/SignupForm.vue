<template>
  <form @submit.prevent="signup">
    <h1 class="title">Sign Up</h1>
    <b-field label="アカウント名">
      <b-input
        v-model="userName"
        required
        icon="account"
      ></b-input>
    </b-field>
    <b-field label="メールアドレス">
      <b-input
        v-model="email"
        required
        type="email"
        icon="email"
      ></b-input>
    </b-field>
    <b-field label="パスワード">
      <b-input
        v-model="password"
        type="password"
        placeholder="パスワードを入力"
        required
        password-reveal
      >
      </b-input>
    </b-field>
    <div class="buttons">
      <b-button
        type="is-primary"
        native-type="submit"
        icon-left="login-variant"
      >新規登録</b-button>
    </div>
  </form>
</template>

<script>

import { db, auth } from '~/plugins/firebase'
// import User from '~/models/User'

export default {
  data() {
    return {
      displayName: '',
      userName: '',
      email: '',
      password: ''
    }
  },
  methods: {

    async signup() {

      const $buefy = this.$buefy
      const $router = this.$router

      const existance = await db.collection('users').where('userName', '==', this.userName).get()

      if( !existance.empty ) {
        $buefy.notification.open({
          duration: 5000,
          message: '既に存在するユーザーです',
          position: 'is-bottom-right',
          type: 'is-warning'
        })
        return
      }

      auth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(async (result) => {
        // console.log(result)

        result.user.updateProfile({
          displayName: this.userName
        })

        await db.collection('users').doc(result.user.uid).set({
          uid:          result.user.uid,
          displayName:  this.userName,
          userName:     this.userName,
          role:         'stranger',
          isBanned:     false,
          isDeleted:    false,
        })

        $buefy.notification.open({
          duration: 5000,
          message: 'ユーザーの登録が完了しました',
          position: 'is-bottom-right',
          type: 'is-success'
        })

        $router.push('home')

      })
      .catch(function(e) {
        console.log(e.code, e.message)
        $buefy.notification.open({
          duration: 5000,
          message: e.message,
          position: 'is-bottom-right',
          type: 'is-danger'
        })
      })

    },
  }

}

</script>