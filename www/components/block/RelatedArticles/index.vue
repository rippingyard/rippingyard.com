<template>
  <div>
    <BlockMain :is-cliff="true">
      <BlockLoading :is-loading="isLoading" :error="errorMessage">
        <ul>
          <li v-for="datum of data" :key="datum.to.path"><CardPostProxy :doc="datum.to" /></li>
        </ul>
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
import { useRelations } from '~~/composables/fetch/useRelations';
import { useDocReference } from '~~/composables/firestore/useDocReference';

const props = defineProps<{
  doc: DocumentReference
}>();

const doc = computed(() => props.doc || undefined);
console.log('doc', doc.value);

const { data, pending, error} = useRelations({
  where: [
    {key: 'by', val: doc.value}
  ]
});

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
}

// const filteredContents = ref<any>();
// const content = computed(() => data.value?.description || '');

// watch(content, () => filteredContents.value = useEntityFilter(content));
watch(data, () => {
  console.log('data!!', data.value);
  if (!data.value) return;

  for(const datum of data.value) {
    console.log('datum', datum);
  }

  // filteredContents.value = useEntityFilter(content);
  checkPermission();
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