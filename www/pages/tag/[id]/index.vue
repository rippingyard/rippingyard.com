<template>
  <div>
    <BlockMain :is-cliff="true">
      <BlockLoading :is-loading="isLoading" :error="errorMessage">
        <ArticleEntity v-if="data" :entity="data" />
        <BlockRelatedArticles v-if="doc" :doc="doc" />
        <!-- <BlockBookmarks :urls="urls" /> -->
      </BlockLoading>
    </BlockMain>
    <!-- <OrganismBillboard v-if="data" :exclude-id="data.id" /> -->
  </div>
</template>
<script lang="ts" setup>
import { useErrorNotFound } from '~~/composables/error/useErrorNotFound';
import { useEntityFilter } from '~~/composables/filter/useEntityFilter';
import { useEntity } from '~~/composables/fetch/useEntity';
import { useEntityId } from '~~/composables/utils/useEntityId';
import { useCanReadEntity } from '~~/composables/permission/useCanReadEntity';
import { useEntityMeta } from '~~/composables/ssr/useEntityMeta';
import { useDocReference } from '~~/composables/firestore/useDocReference';

const route = useRoute();
const entityId = useEntityId(route.params.id as string, 'tag');
const doc = useDocReference(entityId, 'entities');

const { data, pending, error } = useEntity(entityId);

const isNotFound = ref(false);
const errorMessage = computed(() => {
  if (error.value) return error.value;
  if (isNotFound.value) return 'ページが見つかりません';
  return '';
});
const isLoading = computed(() => pending.value && !isNotFound.value);

const checkPermission = () => {
  if (process.server || pending.value) return;

  if (!data.value) {
    console.error('data not found');
    useErrorNotFound();
    return;
  }

  const { canReadEntity } = useCanReadEntity(data.value);
  if (!canReadEntity.value) {
    console.error('no permission')
    useErrorNotFound();
  }
}

const filteredContents = ref<any>();
const content = computed(() => data.value?.description || '');

// watch(content, () => filteredContents.value = useEntityFilter(content));
watch(data, () => {
  console.log('data!!', data.value);
  filteredContents.value = useEntityFilter(content);
  checkPermission();
});

await useEntityMeta(useEntityId(route.params.id as string, 'tag'), data);

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