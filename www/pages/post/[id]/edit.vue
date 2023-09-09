<template>
  <div>
    <BlockMain horizontalSize="large">
      <BlockLoading :is-loading="pending" :error="error">
        <div class="inner" v-if="data">
          <OrganismPostForm :post="data" :is-footer-dotted="false" :is-footer-bordered="true" :is-footer-fixed="true" />
        </div>
      </BlockLoading>
    </BlockMain>
  </div>
</template>
<script lang="ts" setup>
import { usePost } from '~~/composables/fetch/usePost';
import { useCanEditPost } from '~~/composables/permission/useCanEditPost';

const route = useRoute();
const { $openToast: openToast } = useNuxtApp();

const { pending, error, data } = usePost(route.params.id as string);

const checkPermission = () => {
  if (pending.value) return;

  if (!data.value) {
    notFound();
    return;
  }

  const { canEditPost } = useCanEditPost(data.value);
  if (!canEditPost.value) notEditable();
}

if (!pending.value) checkPermission();
watch(pending, () => checkPermission());

const notFound = () => {
  openToast('この記事は非公開です');
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}

const notEditable = () => {
  openToast('この記事を編集する権限がありません');
  navigateTo('/');
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