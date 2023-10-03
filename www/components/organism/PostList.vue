<template>
  <BlockLoading :is-loading="isLoading" :is-error="!!error" :error="error">
    <ul v-if="filteredPosts">
      <li v-for="post, i in filteredPosts" :key="i">
        <component :is="props.component || CardPost" :post="(post as Post)" />
      </li>
    </ul>
    <div v-if="!hideMore" class="console">
      <AtomButton ref="target" expanded centered @click="more()" :is-loading="pending">もっと読む</AtomButton>
    </div>
  </BlockLoading>
</template>
<script lang="ts" setup>
import { OrderByDirection } from '@firebase/firestore';
import CardPost from '~~/components/card/Post.vue';
import { useMe } from '~~/composables/fetch/useMe';
import { useInfinitePosts } from '~~/composables/fetch/usePosts';
import { QueryParams, WhereParams } from '~~/composables/firestore/useCachedDocs';
import { OriginalPost, Post } from '~~/schemas/post';
import { useElementVisibility } from '@vueuse/core';

type Props = {
  component?: typeof CardPost;
  types?: string[];
  limit?: number;
  orderBy?: string;
  order?: OrderByDirection;
  isMine?: boolean;
  hideMore?: boolean;
  filter?: (post: OriginalPost) => boolean;
}

const props = defineProps<Props>();
const posts = ref<OriginalPost[]>([]);
const types = computed(() => props.types || ['log', 'note', 'article']);

const target = ref(null);
const targetIsVisible = useElementVisibility(target);
const removeWhereKeys = ref<string[]>([]);

const loadMore = ref<() => void>();
const hideMore = computed(() => props.hideMore || false);
const isInitialized = ref<boolean>(false);

const where: WhereParams = [
  { key: 'type', val: types.value },
];

const filteredPosts = computed(() => {
  const filter = props.filter;
  if (!filter || !posts.value) return posts.value;
  return posts.value.filter((post) => filter(post));
})

if (props.isMine) {
  const { myRef } = useMe();
  if (myRef.value) {
    where.push({
      key: 'owner',
      val: myRef.value,
    });
  }
  removeWhereKeys.value.push(...['status', 'isPublic']);
}

const condition = ref<Omit<QueryParams, 'collection'>>({
  where,
  limit: props.limit || 100,
  removeWhereKeys: removeWhereKeys.value,
});

const { pending, error, data: result } = useInfinitePosts(condition.value);

watch(result, () => {
  if (result.value?.data === undefined) return;
  isInitialized.value = true;
  console.log('result.value.data', result.value.data);
  posts.value = result.value.data;
  loadMore.value = result.value?.loadMore || undefined;
});

const isLoading = computed(() => !isInitialized.value && pending.value);

watch(targetIsVisible, (value) => {
  if (!value) return;
  more();
});

const more = () => {
  console.log('more!', loadMore);
  if (!loadMore.value) return;
  loadMore.value();
}

</script>
<style lang="scss" scoped>
// .container {
//   width: 100%;
//   min-height: 100vh;
// }

.console {
  width: 100%;
  padding-top: $gap;
}
</style>