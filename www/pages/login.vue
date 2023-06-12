<template>
  <BlockMain>
    <BlockHeading>
      <AtomTitle>LOGIN<small>ログイン</small></AtomTitle>
    </BlockHeading>
    <OrganismLoginForm />
    <div class="footer">
      <p>
        パスワードを忘れた場合は
        <nuxt-link to="/password/reset">こちら</nuxt-link>
      </p>
    </div>
  </BlockMain>
</template>
<script lang="ts" setup>
import { useHtmlHeader } from '~~/composables/utils/useHtmlHeader';


useHtmlHeader({
  title: () => 'ログイン',
});

// import Vue from 'vue'
// import { mapGetters } from 'vuex'

// export default Vue.extend({
//   computed: {
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
