<template>
  <div class="container">
    <BlockLoading :is-loading="isLoading" :is-error="isError" :error="error">
      <ul>
        <li v-for="post, i in posts" :key="i">
          <component :is="props.component || CardPost" :post="post" />
        </li>
      </ul>
      <AtomButton v-if="!hideMore && hasNextPage" @click="more()">もっと読む</AtomButton>
    </BlockLoading>
  </div>
</template>
<script lang="ts" setup>
import { OrderByDirection } from '@firebase/firestore';
import CardPost from '~~/components/card/Post.vue';
import { useMe } from '~~/composables/fetch/useMe';
import { useInfinitePosts, usePosts } from '~~/composables/fetch/usePosts';
import { QueryParams, WhereParams } from '~~/composables/firestore/useCachedDocs';
import { OriginalPost } from '~~/schemas/post';

type Props = {
  component?: typeof CardPost;
  types?: string[];
  limit?: number;
  orderBy?: string;
  order?: OrderByDirection;
  isMine?: boolean;
  hideMore?: boolean;
}

const props = defineProps<Props>();
const posts = ref<OriginalPost[]>();
const types = computed(() => props.types || ['log', 'note', 'article']);

const hideMore = computed(() => props.hideMore || false);

const where: WhereParams = [
  { key: 'type', val: types.value },
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

const condition: Omit<QueryParams, 'collection'> = {
  where,
  limit: props.limit || 100,
};

const { isLoading, isError, data, error, hasNextPage, fetchNextPage } = useInfinitePosts(condition);

watch(data, (newData) => {
  if (!newData) return;
  const newPosts = newData as any;
  posts.value = !newPosts.pages ? newPosts : newPosts.pages.flat();
});

const more = () => {
  fetchNextPage();
}

</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 100vh;
}
</style>