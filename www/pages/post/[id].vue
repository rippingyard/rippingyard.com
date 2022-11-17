<template>
  <BlocksMain>
    <div class="container">
      <div v-if="result.isLoading" class="loading">
        <IconsLoading />
      </div>
      <span v-else-if="result.isError">Error: {{ result.error.message }}</span>
      <ul v-else>
        <li v-for="post in result.data" :key="post.id">
          <BlocksWysiwyg :content="post.content" />
          <p>{{ post.type }}</p>
        </li>
      </ul>
    </div>
  </BlocksMain>
</template>
<script lang="ts" setup>
import { usePosts } from '~/composables/firestore/usePosts'

const route = useRoute();

const result = usePosts({
  where: [
    { key: 'id', val: route.params.id as string }
  ],
  limit: 1,
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