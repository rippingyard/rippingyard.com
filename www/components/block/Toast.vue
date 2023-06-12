<template>
  <div class="toast" :class="{ isOpen: toast.isOpen, isDanger: toast.type === 'danger' }" @click="close">
    <p>{{ toast.message }}</p>
  </div>
</template>
<script lang="ts" setup>

const { $toast: toast, $closeToast: closeToast } = useNuxtApp();

const close = () => closeToast();
</script>
<style lang="scss" scoped>
.toast {
  width: 480px;
  position: fixed;
  bottom: -70px;
  right: 0;
  opacity: 0;
  background: $black;
  color: $white;
  // border-radius: 6px;
  padding: 22px 26px;
  transition: 0.14s ease-out;
  z-index: 100000;

  &.isOpen {
    bottom: 0;
    opacity: 1;
  }

  &.isDanger {
    background: $orange;
  }

  @include until($desktop) {
    max-width: 100%;
  }
}
</style>
