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
        placeholder="Password reveal input"
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

import { auth } from '~/plugins/firebase'

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

    signup() {

      const $buefy = this.$buefy

      auth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(result => {
    //     console.log(result.user)
    //     result.user.updateProfile({
    //       displayName: this.displayName
    //     })

    //     const user = new User()

    //     user.create({
    //       uid: result.user.uid,
    //       displayName: this.displayName,
    //       userName: this.userName,
    //       email: this.email
    //     })

        $buefy.notification.open({
          duration: 5000,
          message: 'ユーザーの登録が完了しました',
          position: 'is-bottom-right',
          type: 'is-success'
        })

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