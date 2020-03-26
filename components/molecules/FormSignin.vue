<template>
  <form @submit.prevent="signin({
    email: email,
    password: password,
    notification: $buefy.notification,
  })">
    <h1 class="title">Login</h1>
    <b-field label="メールアドレス">
      <b-input
        v-model="email"
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
      >ログイン</b-button>
    </div>
  </form>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({
      signin: 'auth/signin'
    })
  }
}

</script>