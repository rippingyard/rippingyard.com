<template>
  <div>
    <BlockMain horizontalSize="large">
      <BlockLoading :is-loading="isLoading" :is-error="isError" :error="error">
        <div class="inner">
          <OrganismPostForm :post="data" :is-footer-dotted="false" :is-footer-bordered="true" :is-footer-fixed="true" />
        </div>
      </BlockLoading>
    </BlockMain>
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
.inner {
  width: 100%;
  min-height: 100vh;
  // padding-top: $gap;
}

.loading {
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>