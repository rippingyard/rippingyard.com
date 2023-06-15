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
import { isServer } from '@tanstack/vue-query';
import { usePost } from '~~/composables/fetch/usePost';
import { useCanReadPost } from '~~/composables/permission/useCanReadPost';
import { useHtmlHeader } from '~~/composables/utils/useHtmlHeader';

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
  if (isServer) return;
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

const notFound = () => {
  openToast('この記事は非公開です');
  isNotFound.value = true;
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
}

// head(): any {
//     return {
//       title: getTitle(this.$data.post),
//       meta: [
//         {
//           hid: 'og:title',
//           property: 'og:title',
//           content: getTitle(this.$data.post),
//         },
//         {
//           hid: 'twitter:title',
//           name: 'twitter:title',
//           content: getTitle(this.$data.post),
//         },
//         {
//           hid: 'description',
//           name: 'description',
//           content: getSummary(this.$data.post.content),
//         },
//         {
//           hid: 'og:description',
//           property: 'og:description',
//           content: getSummary(this.$data.post.content),
//         },
//         {
//           hid: 'twitter:description',
//           name: 'twitter:description',
//           content: getSummary(this.$data.post.content),
//         },
//         {
//           hid: 'og:url',
//           property: 'og:url',
//           content: this.$data.post.sociallink,
//         },
//         {
//           hid: 'twitter:url',
//           name: 'twitter:url',
//           content: this.$data.post.sociallink,
//         },
//         {
//           hid: 'og:image',
//           property: 'og:image',
//           content:
//             this.ownThumbnail || 'https://www.rippingyard.com/img/ogimage.png',
//         },
//         {
//           hid: 'twitter:image',
//           name: 'twitter:image',
//           content:
//             this.ownThumbnail || 'https://www.rippingyard.com/img/ogimage.png',
//         },
//       ],
//     }
//   },

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