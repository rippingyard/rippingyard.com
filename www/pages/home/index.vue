<template>
  <div>
    <BlockMain>
      <OrganismUser v-if="me" :user="me" />
    </BlockMain>
    <OrganismBillboard />
  </div>
</template>
<script lang="ts" setup>
import { useTitle } from '@vueuse/core';
import { useCanTouchUser } from '~~/composables/permission/useCanTouchUser';

const { $me: me } = useNuxtApp();

// const user = computed(() => {
//   if (!me.value) return null;
//   return me.value;
// });

// const checkPermission = () => {
//   console.log('me', user);

//   if (!user || !user.value) {
//     notFound();
//     return;
//   }

//   const { canTouchUser } = useCanTouchUser(user.value);
//   if (!canTouchUser.value) {
//     notFound();
//     return;
//   }

//   useTitle(user.value.displayName);
// }

// checkPermission();

const notFound = () => {
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