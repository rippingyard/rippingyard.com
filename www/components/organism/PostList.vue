<template>
  <div class="container">
    <BlockLoading :is-loading="isLoading" :is-error="isError" :error="error">
      <ul>
        <li v-for="post in data as OriginalPost[]" :key="post.id">
          <component :is="props.component || ItemPost" :post="post" />
        </li>
      </ul>
    </BlockLoading>
  </div>
</template>
<script lang="ts" setup>
import ItemPost from '~~/components/item/Post.vue';
import { usePosts } from '~~/composables/fetch/usePosts';
import { OriginalPost } from '~~/schemas/post';

type Props = {
  component?: typeof ItemPost;
}

const props = defineProps<Props>();

const { isLoading, isError, data, error } = usePosts({
  where: [
    { key: 'type', val: ['note', 'article'] },
  ],
  limit: 100,
  orderBy: { key: 'publishedAt' },
});

</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 100vh;
}
</style>