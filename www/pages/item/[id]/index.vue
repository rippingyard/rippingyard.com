<template>
  <p>Item</p>
  <p>{{ isLoading }}</p>
  <p>{{ data?.name?.ja || '読み込めてない' }}</p>
</template>
<script lang="ts" setup>
import { useItem } from '~/composables/fetch/useItem';

const route = useRoute();

const { isLoading, data } = useItem(route.params.id as string)

</script>