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
      <b-navbar-item v-if="!$isAuthenticated($store)" :to="{ path: 'signin' }" tag="router-link">
        ログイン
      </b-navbar-item>
      <b-navbar-item v-if="!$isAuthenticated($store)" :to="{ path: 'signup' }" tag="router-link">
        新規登録
      </b-navbar-item>
      <b-navbar-dropdown v-if="$isAuthenticated($store)" label="ユーザー">
        <b-navbar-item :to="{ path: 'home' }" tag="router-link">HOME</b-navbar-item>
        <b-navbar-item @click="$signOut($store)">ログアウト</b-navbar-item>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
</template>

<script>

export default {

  data() {
    // return {
    //   me: this.$store.state.auth.me
    // }
  },
  asyncData: (context) => {
    console.log('Header');
    console.log('My Name', context.$store.state.auth.me.displayName)
  },

}