<template>
  <form @submit.prevent="signin">
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

import { auth } from '~/plugins/firebase'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {

    signin() {

      const notification = this.$buefy.notification

      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$store.commit('auth/setMe', user)

          notification.open({
            duration: 5000,
            message: 'ログインしました',
            position: 'is-bottom-right',
            type: 'is-success',
            hasIcon: false
          })

          // console.log(user)
          // this.setMe(auth.currentUser)
          // if( !this.me ) {
          //   this.$buefy.notification.open({
          //     duration: 5000,
          //     message: 'ユーザーが登録されていません',
          //     position: 'is-bottom-right',
          //     type: 'is-danger',
          //     hasIcon: false
          //   })
          // }

          this.$router.push('/')

        })
        .catch(function(e) {

          // console.log(e)

          notification.open({
            duration: 5000,
            message: 'ログインに失敗しました',
            position: 'is-bottom-right',
            type: 'is-danger',
            hasIcon: false
          })

        })

    },

  }

}

</script>