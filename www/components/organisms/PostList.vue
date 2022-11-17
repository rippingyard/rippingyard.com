<template>
  <div class="container">
    <div v-if="result.isLoading" class="loading">
      <IconsLoading />
    </div>
    <span v-else-if="result.isError">Error: {{ result.error.message }}</span>
    <ul v-else>
      <li v-for="post in result.data" :key="post.id">
        <BlocksPostItem :post="post" />
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { usePosts } from '~/composables/firestore/usePosts'

const result = usePosts({
  where: [
    { key: 'type', val: 'article' },
  ],
  limit: 9,
  orderBy: { key: 'publishedAt' },
});
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