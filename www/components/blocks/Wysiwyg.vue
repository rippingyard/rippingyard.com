<template>
  <div class="wysiwyg" v-html="props.content" />
</template>
<script lang="ts" setup>
const props = defineProps<{
  content: string;
}>();
</script>