<template>
  <div class="wysiwyg" :class="{ 'is-article': isArticle }" v-html="content" />
</template>
<script lang="ts" setup>
const props = defineProps<{
  content: string;
  isArticle?: boolean;
}>();

const content = computed(() => props.content || '');
const isArticle = computed(() => props.isArticle || false);
</script>