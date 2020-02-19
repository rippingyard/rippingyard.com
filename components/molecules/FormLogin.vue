<template>
  <form @submit.prevent="login">
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
      >ログイン</b-button>
    </div>
  </form>
</template>

<script>

export default {

  methods: {

    login() {

      alert('Login')

    },

  }

}

</script>