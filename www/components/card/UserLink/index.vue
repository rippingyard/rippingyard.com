<template>
  <nuxt-link v-if="user" :to="`/people/${user?.userName}`">
    <IconUser />{{ user?.displayName || user?.uid }}
  </nuxt-link>
</template>
<script setup lang="ts">
import { DocumentReference } from 'firebase/firestore';
import { useUser } from '~/composables/fetch/useUser';
import { User } from '~/schemas/user';

const props = defineProps<{
  user?: User;
  userRef?: DocumentReference;
}>();

const { data } = useUser({ ref: props.userRef });

const user = computed(() => props.user || data.value);
</script>
<style lang="scss" scoped>
.icon {
  margin-right: 5px;
}
</style>