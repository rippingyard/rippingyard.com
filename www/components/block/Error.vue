<template>
  <div class="error">
    Error: {{ props.error?.message }}
  </div>
</template>
<script lang="ts" setup>

type Props = {
  error: any;
}

const props = defineProps<Props>();

</script>
<style lang="scss" scoped>
.error {
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>