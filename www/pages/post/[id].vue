<template>
  <BlockMain :is-cliff="true">
    <div v-if="result.isLoading" class="loading">
      <IconLoading />
    </div>
    <span v-else-if="result.isError">Error: {{ result.error.message }}</span>
    <ArticlePost v-else :post="result.data" />
  </BlockMain>
</template>
<script lang="ts" setup>
import { usePost } from '~~/composables/fetch/usePost'

const route = useRoute();

const result = usePost(route.params.id as string);
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 100vh;
}

.loading {

  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>