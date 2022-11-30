<template>
  <div class="container">
    <div v-if="props.isLoading" class="loading">
      <IconLoading />
    </div>
    <div v-else-if="props.isError" :error="props.error" class="error">
      Error: {{ props.error?.message }}
    </div>
    <slot v-else />
  </div>
</template>
<script lang="ts" setup>

const props = defineProps<{
  isLoading: boolean
  isError: boolean
  error?: any
}>()

</script>
<style lang="scss" scoped>
.loading {
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}

.error {
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>