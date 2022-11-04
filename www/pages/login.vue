<template>
  <BlocksMain>
    <p v-if="isAuthenticated">認証済み</p>
    <AtomsTitle>Login</AtomsTitle>
    <OrganismsLoginForm />
    <div class="footer">
      <p>
        パスワードを忘れた場合は
        <nuxt-link to="/password/reset">
          こちら
        </nuxt-link>
      </p>
    </div>
  </BlocksMain>
</template>
<script lang="ts" setup>
import { useAuth } from '~/composables/firebase/useAuth'

// const isAuthenticated = ref(false)

// onMounted(() => {
//   const auth = useAuth();
//   isAuthenticated.value = auth.isAuthenticated.value
// })

const { isAuthenticated } = useAuth();
// console.log('isAuthenticated', isAuthenticated)


// import Vue from 'vue'
// import { mapGetters } from 'vuex'

// export default Vue.extend({
//   computed: {
//     ...mapGetters({
//       isAuthenticated: 'auth/isAuthenticated',
//     }),
//     redirectPath(): string {
//       return this.$store.state.auth.redirectPath || '/home/'
//     },
//   },
//   watch: {
//     isAuthenticated() {
//       console.log('auth changed!', this.isAuthenticated)
//       if (this.isAuthenticated) {
//         this.snack('ログインしました')
//         this.$router.push(this.redirectPath)
//       }
//     },
//   },
//   created() {
//     if (this.isAuthenticated) {
//       this.$router.push(this.redirectPath)
//     }
//   },
//   head() {
//     return {
//       title: 'Login',
//     }
//   },
// })
</script>
<style lang="scss" scoped>
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
