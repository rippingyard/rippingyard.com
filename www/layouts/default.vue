<template>
  <div class="wrapper">
    <OrganismNav />
    <slot />
    <OrganismFooter />
    <!-- <Loading :is-loading="isLoading" /> -->
    <BlockToast />
  </div>
</template>
<script setup lang="ts">
import { provide } from 'vue';

const toast = ref<{
  isOpen: boolean,
  type: 'info' | 'danger',
  message: string,
}>({
  isOpen: false,
  type: 'info',
  message: '',
});

const openToast = (message: string, isDanger = false) => {
  toast.value = {
    isOpen: true,
    type: isDanger ? 'danger' : 'info',
    message,
  }
}

const closeToast = () => {
  toast.value.isOpen = false;
}

provide('toast', {
  toast,
  openToast,
  closeToast,
});
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