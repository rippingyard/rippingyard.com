<template>
  <div>
    <BlockMain horizontal-size="large">
      <BlockLoading :is-loading="pending" :error="error">
        <OrganismUser v-if="user" :user="user" />
      </BlockLoading>
    </BlockMain>
    <OrganismBillboard />
  </div>
</template>
<script lang="ts" setup>
import { useUsers } from '~~/composables/fetch/useUsers';
import { useCanTouchUser } from '~~/composables/permission/useCanTouchUser';
import { useHtmlHeader } from '~~/composables/utils/useHtmlHeader';

const route = useRoute();
const { $openToast: openToast } = useNuxtApp();

const { pending, error, data } = useUsers({
  where: [
    { key: 'userName', val: route.params.id },
  ],
});

const user = computed(() => {
  if (pending.value || !data.value) return null;
  return data.value[0];
});

const checkPermission = () => {
  if (process.server) return;
  if (pending.value) return;

  if (!user.value) {
    notFound();
    return;
  }

  const { canTouchUser } = useCanTouchUser(user.value);
  if (!canTouchUser.value) {
    notFound();
    return;
  }
}

useHtmlHeader({
  title: () => user?.value?.displayName || '',
});

if (!pending.value) checkPermission();
watch(pending, () => checkPermission());

const notFound = () => {
  openToast('このユーザーは非公開です');
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