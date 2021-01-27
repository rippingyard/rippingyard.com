<template>
  <main class="block container">
    <Header />
    <h1 class="title">Login</h1>
    <LoginForm />
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
  },
  created() {
    if (this.isAuthenticated) {
      console.log('login', this.$store.state.auth.redirectPath)
      this.$router.push(this.$store.state.auth.redirectPath)
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
.container {
  width: 800px;
}

.title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 10px;
}
</style>
