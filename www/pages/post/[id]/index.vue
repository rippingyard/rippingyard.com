<template>
  <div>
    <BlockMain :is-cliff="true">
      <BlockLoading :is-loading="isLoading" :is-error="isError || isNotFound" :error="errorMessage">
        <ArticlePost v-if="data" :post="data" />
      </BlockLoading>
    </BlockMain>
    <OrganismBillboard v-if="data" :exclude-id="data.id" />
  </div>
</template>
<script lang="ts" setup>
import { usePost } from '~~/composables/fetch/usePost';
import { useCanReadPost } from '~~/composables/permission/useCanReadPost';
import { useHtmlHeader } from '~~/composables/utils/useHtmlHeader';
import { usePostMeta } from '~~/composables/ssr/usePostMeta';

const route = useRoute();
const { $openToast: openToast, $me: me } = useNuxtApp();

const { isLoading: isLoadingPost, isError, error, data } = usePost(route.params.id as string);

const title = computed(() => data.value ? getTitle(data.value) : '');
const isNotFound = ref(false);
const errorMessage = computed(() => {
  if (isError.value) return error;
  if (isNotFound.value) return 'ページが見つかりません';
  return '';
});
const isLoading = computed(() => isLoadingPost.value && !isNotFound.value);

const checkPermission = () => {
  if (process.server) return;
  if (isLoadingPost.value) return;

  if (!data.value) {
    notFound();
    return;
  }

  const { canReadPost } = useCanReadPost(data.value);
  if (!canReadPost.value) notFound();
}

if (!isLoading.value) checkPermission();
watch(isLoading, () => checkPermission());

useHtmlHeader({
  title: () => title.value,
});

await usePostMeta(route.params.id as string);

const notFound = () => {
  openToast('この記事は非公開です');
  isNotFound.value = true;
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
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