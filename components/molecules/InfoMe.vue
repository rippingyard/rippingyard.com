<template>
  <div v-if="$isAuthenticated($store)" class="box mine">
    <div class="mine-container">
      <p class="displayname">{{ me.displayName }}</p>
      <p>ユーザー名: {{ me.userName }}</p>
      <p>役割: {{ me.role }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">

.box {
  background-color: $white;
  border-radius: 0;
  border: 4px solid $black;
  // padding: 20px;
  color: $black;
  // position: absolute;
  // right: -200px;
  // width: 200px;
}

.mine {

  padding: 1px;

  .mine-container {
    border: 1px solid $black;
  }

  p {
    padding: 14px 20px 0;

    &:last-child {
      padding-bottom: 14px;
    }
  }

  .displayname {
    font-size: 24px;
    font-weight: 800;
    border-bottom: 1px solid $black;
    padding: 14px 20px;
  }

}

</style>

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