<template>
  <div>
    <BlockMain :is-cliff="true">
      <BlockLoading :is-loading="isLoading" :is-error="isError" :error="error">
        <ArticlePost v-if="data" :post="data" />
      </BlockLoading>
    </BlockMain>
    <OrganismBillboard />
  </div>
</template>
<script lang="ts" setup>
import { usePost } from '~~/composables/fetch/usePost';
import { useCanReadPost } from '~~/composables/permission/useCanReadPost';

const route = useRoute();
const { $openToast: openToast } = useNuxtApp();

const { isLoading, isError, error, data } = usePost(route.params.id as string);

const checkPermission = () => {
  if (isLoading.value) return;

  if (!data.value) {
    notFound();
    return;
  }

  const { canReadPost } = useCanReadPost(data.value);
  if (!canReadPost.value) notFound();
}

if (!isLoading.value) checkPermission();
watch(isLoading, () => checkPermission());

const notFound = () => {
  openToast('この記事は非公開です');
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}

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