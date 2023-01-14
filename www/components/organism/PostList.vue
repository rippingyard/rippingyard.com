<template>
  <div class="container">
    <BlockLoading :is-loading="isLoading" :is-error="isError" :error="error">
      <ul>
        <li v-for="post in data as OriginalPost[]" :key="post.id">
          <component :is="props.component || CardPost" :post="post" />
        </li>
      </ul>
    </BlockLoading>
  </div>
</template>
<script lang="ts" setup>
import CardPost from '~~/components/card/Post.vue';
import { useMe } from '~~/composables/fetch/useMe';
import { usePosts } from '~~/composables/fetch/usePosts';
import { WhereParams } from '~~/composables/firestore/useCachedDocs';
import { OriginalPost } from '~~/schemas/post';

type Props = {
  component?: typeof CardPost;
  isMine?: boolean;
}

const props = defineProps<Props>();

const where: WhereParams = [
  { key: 'type', val: ['log', 'note', 'article'] },
];

if (props.isMine) {
  const { myRef } = useMe();
  if (myRef.value) {
    where.push({
      key: 'owner',
      val: myRef.value,
    });
  }
}

const { isLoading, isError, data, error } = usePosts({
  where,
  limit: 100,
  orderBy: { key: 'publishedAt' },
});

watch(data, (newData) => {
  console.log('watch posts', newData);
});

</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 100vh;
}
</style>