<template>
  <div>
    <BlockMain horizontalSize="large">
      <div class="inner">
        <OrganismPostForm :is-footer-dotted="false" :is-footer-bordered="true" :is-footer-fixed="true" />
      </div>
    </BlockMain>
  </div>
</template>
<script lang="ts" setup>
import { useCanCreateArticle } from '~/composables/permission/useCanCreateArticle';

const { $openToast: openToast } = useNuxtApp();

const checkPermission = () => {
  const { canCreateArticle } = useCanCreateArticle();
  console.log('canCreateArticle', canCreateArticle.value);
  if (!canCreateArticle.value) notPostable();
}

onMounted(() => {
  checkPermission();
});

const notPostable = () => {
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