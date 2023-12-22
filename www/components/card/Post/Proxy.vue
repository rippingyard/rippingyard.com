<template>
  <p>{{ doc.path }}</p>
  <!-- <CardPost v-if="post" :post="post" /> -->
</template>
<script lang="ts" setup>
import { DocumentReference } from 'firebase/firestore';
import { useCachedDoc } from '~~/composables/firestore/useCachedDoc';

// const post = ref<OriginalPost>();
const props = defineProps<{
  doc: DocumentReference,
}>();

const snapshot = useCachedDoc(props.doc);

onMounted(() => {
  console.log('snapshot', snapshot);
});

</script>