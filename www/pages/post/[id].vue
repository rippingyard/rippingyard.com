<template>
  <BlockMain :is-cliff="true">
    <BlockLoading :is-loading="isLoading" :is-error="isError" :error="error">
      <ArticlePost v-if="data" :post="data" />
    </BlockLoading>
  </BlockMain>
</template>
<script lang="ts" setup>
import { usePost } from '~~/composables/fetch/usePost';

const route = useRoute();

const { isLoading, isError, error, data } = usePost(route.params.id as string);
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