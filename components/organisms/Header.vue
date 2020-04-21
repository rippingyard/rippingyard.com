<template>
  <b-navbar
    type="is-primary"
  >
    <template slot="brand">
      <b-navbar-item :to="{ path: '/' }" tag="router-link">
        ripping yard
      </b-navbar-item>
    </template>
    <template slot="end">
      <template v-if="!$isAuthenticated($store)">
        <b-navbar-item :to="{ path: 'signin' }" tag="router-link">ログイン</b-navbar-item>
        <b-navbar-item :to="{ path: 'signup' }" tag="router-link">新規登録</b-navbar-item>
      </template>
      <template v-else>
        <b-navbar-item :to="{ path: '/home' }" tag="router-link">ホーム</b-navbar-item>
        <b-navbar-item @click="$signOut($store)">ログアウト</b-navbar-item>
      </template>
    </template>
  </b-navbar>
</template>

<script>

export default {

  data() {
    return {
      // me: this.$store.state.auth.me
    }
  },
  asyncData: (context) => {
    // console.log('Header');
    // console.log('My Name', context.$store.state.auth.me.displayName)
  },

}
</script>