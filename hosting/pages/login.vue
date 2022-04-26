<template>
  <main class="block container">
    <Header />
    <h1 class="title">Login</h1>
    <LoginForm />
    <div class="footer">
      <p>
        パスワードを忘れた場合は
        <nuxt-link to="/password/reset">こちら</nuxt-link>
      </p>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
    redirectPath(): string {
      return this.$store.state.auth.redirectPath || '/home/'
    },
  },
  watch: {
    isAuthenticated() {
      console.log('auth changed!', this.isAuthenticated)
      if (this.isAuthenticated) {
        this.snack('ログインしました')
        this.$router.push(this.redirectPath)
      }
    },
  },
  created() {
    if (this.isAuthenticated) {
      this.$router.push(this.redirectPath)
    }
  },
  head() {
    return {
      title: 'Login',
    }
  },
})
</script>
<style lang="scss" scoped>
.title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 10px;
}
.footer {
  font-size: 0.9rem;
  color: $black;
  padding-top: $gap;
  a {
    color: $blue;
    text-decoration: underline;
  }
}
</style>
