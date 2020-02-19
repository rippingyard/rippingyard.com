<template>
  <form @submit.prevent="signup">
    <h1 class="title">Sign Up</h1>
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
      >新規登録</b-button>
    </div>
  </form>
</template>

<script>

export default {

  methods: {

    signup() {

      alert('Sign Up')

    },

  }

}

</script>