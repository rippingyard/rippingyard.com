<template>
  <div class="container">
    <div v-if="isLoading" class="loading">
      <IconLoading />
    </div>
    <div v-else-if="isError" :error="props.error" class="error">
      <p v-html="renderWidgets(props.error?.message)"></p>
    </div>
    <slot v-else />
  </div>
</template>
<script lang="ts" setup>

const props = defineProps<{
  isLoading: boolean
  error?: any
}>();

const isLoading = computed(() => props.isLoading !== undefined ? props.isLoading : true);
const isError = computed(() => !!props.error);

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
  // min-height: 100vh;
  // justify-content: center;
  // align-items: center;
  font-size: 1.4rem;
  word-break: break-all;

  a {
    text-decoration: underline;
    font-weight: 800;
  }
}
</style>