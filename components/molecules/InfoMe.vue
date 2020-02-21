<template>
  <div v-if="$isAuthenticated($store)" class="box">
    <p>Logined!</p>
    <p>ID: {{ me.id }}</p>
    <p>表示名: {{ me.displayName }}</p>
    <p>ユーザー名: {{ me.userName }}</p>
    <p>役割: {{ me.role }}</p>
  </div>
</template>

<script>

import { auth } from '~/plugins/firebase'

export default {
  data() {
    return {
      me: this.$store.state.auth.me
    }
  },
  created() {
    console.log('Me', this.$store.state.auth.me)
  },
  methods: {
  }

}

</script>