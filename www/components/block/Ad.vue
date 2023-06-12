<template>
  <div class="ad" :class="{ dev: !isPrd }">
    <slot />
  </div>
</template>
<script lang="ts" setup>
const isPrd = import.meta.env.NODE_ENV === 'production';
</script>

<style scoped lang="scss">
.ad {
  min-height: 140px;
  margin-bottom: $gap;
}
</style>
