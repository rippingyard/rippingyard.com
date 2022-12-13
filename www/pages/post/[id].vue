<template>
  <BlockMain :is-cliff="true">
    <BlockLoading :is-loading="isLoading" :is-error="isError" :error="error">
      <ArticlePost v-if="data" :post="data" />
    </BlockLoading>
  </BlockMain>
</template>
<script lang="ts" setup>
import { usePost } from '~~/composables/fetch/usePost';
import { useCanReadPost } from '~~/composables/permission/useCanReadPost';

const route = useRoute();
const { $openToast: openToast } = useNuxtApp();

const { isLoading, isError, error, data } = usePost(route.params.id as string);

const checkPermission = () => {
  if (isLoading.value) return;
  const { canReadPost } = useCanReadPost(data.value);
  if (!canReadPost.value) {
    openToast('この記事は非公開です');
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
  }
}

if (!isLoading.value) checkPermission();
watch(isLoading, () => checkPermission());

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