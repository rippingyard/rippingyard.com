<template>
  <div class="container">
    <BlockLoading v-if="result.isLoading" />
    <BlockError v-else-if="result.isError" :error="result.error" />
    <ul v-else>
      <li v-for="post in result.data" :key="post.id">
        <component :is="props.component || ItemPost" :post="post" />
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import ItemPost from '~~/components/item/Post.vue';
import { usePosts } from '~~/composables/fetch/usePosts';

type Props = {
  component?: typeof ItemPost;
}

const props = defineProps<Props>();

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
</style>