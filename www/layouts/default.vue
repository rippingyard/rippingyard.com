<template>
  <div class="wrapper">
    <p v-if="auth.isAuthenticated">認証済み</p>
    <p v-else>未認証</p>
    <!-- <Nav /> -->
    <slot />
    <!-- <Footer /> -->
    <!-- <ActivityModal /> -->
    <!-- <Loading :is-loading="isLoading" /> -->
    <!-- <Snack /> -->
  </div>
</template>
<script setup lang="ts">
import { useAuth } from '~/composables/firebase/useAuth';
// const isLoading = ref<boolean>(false);

const auth = useAuth();

</script>
<style lang="scss">
html,
body {
  margin: 0;
  font-size: 14px;
  line-height: 1.8;
  color: $black;
  font-family: $font-normal;
  background-color: $white;
}
</style>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  margin: auto;
  // background-color: #111;
}
</style>