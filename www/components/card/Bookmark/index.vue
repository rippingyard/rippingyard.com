<template>
  <div v-if="!error">
    <div v-if="pending" class="pending">
      <IconLoading size="medium" />
    </div>
    <a v-else-if="bookmark" :href="url || bookmark?.metadata?.url || ''" target="_blank" class="container">
      <div class="contents">
        <p class="name">{{ bookmark.name }}</p>
        <p class="description">{{ bookmark.description }}</p>
      </div>
      <p v-if="bookmark.thumbnailImage" class="thumbnail"><img :src="bookmark.thumbnailImage" /></p>
    </a>
  </div>
</template>
<script lang="ts" setup>
import { useSaveEntity } from '~/composables/save/useSaveEntity';
import { OriginalEntity } from '~/schemas/entity';
import { useBookmark } from '~/composables/fetch/useBookmark';
import { useSaveRelation } from '~~/composables/save/useSaveRelation';
import { useUrl } from '~/composables/fetch/useUrl';
import { isUrl } from '~~/utils';
import { useEntityId } from '~~/composables/utils/useEntityId';
import { useMe } from '~~/composables/fetch/useMe';

const props = defineProps<{
  url?: string;
  bookmark?: OriginalEntity;
  save?: boolean;
}>();

const url = computed(() => props.url);
const bookmark = ref<OriginalEntity | undefined>(props.bookmark);

const fetchUrl = useUrl();
const mutateAsyncEntity = useSaveEntity();
const mutateAsyncRelation = useSaveRelation();

const { pending, data, error } = useBookmark(url.value);
const { me } = useMe();

watch(pending, async () => {
  if (!url.value || pending.value || !data.value) return;
  if (data.value?.id) {
    bookmark.value = data.value;
    return;
  }
  if (!props.save) return;

  const { data: metadata } = await fetchUrl(url.value);

  const result = await mutateAsyncEntity({
    id: useEntityId(url.value, 'bookmark'),
    type: 'bookmark',
    name: metadata.value?.title || url.value,
    description: metadata.value?.description || '',
    thumbnailImage: isUrl(metadata.value?.image || '') ? metadata.value?.image : '',
    metadata: { ...metadata.value } || undefined,
  });

  if (result) {
    bookmark.value = result;
  }
});

</script>
<style lang="scss" scoped>
.container {
  display: flex;
  align-items: stretch;
  border: 1px solid $gray-black;
}

.thumbnail {
  width: 180px;
  min-height: 180px;
  background-color: $black;

  >img {
    max-width: 100%;
    object-fit: cover;
    height: 100%;
  }
}

.contents {
  padding: 12px;
  width: calc(100% - 180px);
  color: $black;
  box-sizing: border-box;

  .name {
    font-size: 1.2rem;
    font-weight: 800;
  }

  .description {
    font-size: 0.8rem;
    color: $gray-black;
  }
}

.pending {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>