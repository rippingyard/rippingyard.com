<template>
  <div v-if="$isAuthenticated($store)" class="box">
    <p>Logined!</p>
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