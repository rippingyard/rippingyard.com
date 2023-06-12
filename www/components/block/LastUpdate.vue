<template>
  <p class="date">最終更新日：{{ props.date }}</p>
</template>
<script lang="ts" setup>
const props = defineProps<{
  date: string
}>();
</script>
<style lang="scss" scoped>
.date {
  font-size: 0.8rem;
  color: $gray-black;
  padding-top: 5px;
}
</style>