<template>
  <BlockLoading :is-loading="isLoading" :is-error="!!error" :error="error">
    <ul v-if="bookmarks" class="bookmarks">
      <li v-for="bookmark, i in bookmarks" :key="i">
        <component :is="props.component || CardBookmark" :bookmark="(bookmark as OriginalEntity)" />
      </li>
    </ul>
    <div v-if="!hideMore" class="console">
      <AtomButton ref="target" expanded centered @click="more()" :is-loading="pending">もっと読む</AtomButton>
    </div>
  </BlockLoading>
</template>
<script lang="ts" setup>
import { OrderByDirection } from '@firebase/firestore';
import { useElementVisibility } from '@vueuse/core';
import CardBookmark from '~~/components/card/Bookmark/index.vue';
import { useMe } from '~~/composables/fetch/useMe';
import { useInfiniteEntities } from '~~/composables/fetch/useEntities';
import { QueryParams, WhereParams } from '~~/composables/firestore/useCachedDocs';
import { OriginalEntity, Entity } from '~~/schemas/entity';

type Props = {
  component?: typeof CardBookmark;
  types?: string[];
  limit?: number;
  orderBy?: string;
  order?: OrderByDirection;
  isMine?: boolean;
  hideMore?: boolean;
  filter?: (post: OriginalEntity) => boolean;
}

const props = defineProps<Props>();
const bookmarks = ref<OriginalEntity[]>([]);
const types = computed(() => props.types || ['bookmark']);

const target = ref(null);
const targetIsVisible = useElementVisibility(target);
const removeWhereKeys = ref<string[]>([]);

const loadMore = ref<() => void>();
const hideMore = computed(() => props.hideMore || false);
const isInitialized = ref<boolean>(false);

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
  removeWhereKeys.value.push(...['status', 'isPublic']);
}

const condition = ref<Omit<QueryParams, 'collection'>>({
  where,
  limit: props.limit || 100,
  removeWhereKeys: removeWhereKeys.value,
});

const { pending, error, data: result } = useInfiniteEntities(condition.value);

watch(result, () => {
  if (result.value?.data === undefined) return;
  isInitialized.value = true;
  console.log('result.value.data', result.value.data);
  bookmarks.value = result.value.data;
  loadMore.value = result.value?.loadMore || undefined;
});

const isLoading = computed(() => !isInitialized.value && pending.value);

watch(targetIsVisible, (value) => {
  if (!value) return;
  more();
});

const more = () => {
  if (!loadMore.value) return;
  loadMore.value();
}

</script>
<style lang="scss" scoped>
.console {
  width: 100%;
  padding-top: $gap;
}

.bookmarks {
  >li {
    margin-bottom: 10px;
  }
}
</style>