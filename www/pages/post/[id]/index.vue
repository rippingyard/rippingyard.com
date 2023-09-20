<template>
  <div>
    <BlockMain :is-cliff="true">
      <BlockLoading :is-loading="isLoading" :error="errorMessage">
        <ArticlePost v-if="data" :post="data" />
        <BlockBookmarks :urls="urls" />
      </BlockLoading>
    </BlockMain>
    <!-- <OrganismBillboard v-if="data" :exclude-id="data.id" /> -->
  </div>
</template>
<script lang="ts" setup>
import { usePost } from '~~/composables/fetch/usePost';
import { useCanReadPost } from '~~/composables/permission/useCanReadPost';
import { useHtmlHeader } from '~~/composables/utils/useHtmlHeader';
import { usePostMeta } from '~~/composables/ssr/usePostMeta';
import { useEntityFilter } from '~~/composables/filter/useEntityFilter';

const route = useRoute();
const { $openToast: openToast, $me: me } = useNuxtApp();

await usePostMeta(route.params.id as string);

const { data, pending, error } = usePost(route.params.id as string);

const title = computed(() => data.value ? getTitle(data.value) : '');
const isNotFound = ref(false);
const errorMessage = computed(() => {
  if (error.value) return error.value;
  if (isNotFound.value) return 'ページが見つかりません';
  return '';
});
const isLoading = computed(() => pending.value && !isNotFound.value);

const checkPermission = () => {
  if (process.server || pending.value) return;

  if (!data.value) {
    notFound();
    return;
  }

  const { canReadPost } = useCanReadPost(data.value);
  if (!canReadPost.value) notFound();
}

const filteredContents = ref<any>();
const urls = computed(() => filteredContents.value?.urls || []);
const content = computed(() => data.value?.content || '');

watchEffect(() => filteredContents.value = useEntityFilter(content));
watchEffect(() => checkPermission());

useHtmlHeader({
  title: () => title.value,
});

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