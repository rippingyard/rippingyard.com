<template>
  <h1>
    <slot />
  </h1>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped>
h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 10px;
  line-height: 3.4rem;

  :deep(small) {
    display: block;
    font-size: 0.9rem;
    font-weight: 400;
    margin-top: -15px;
  }
}
</style>