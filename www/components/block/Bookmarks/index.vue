<template>
  <ul v-if="urls && urls.length > 0" class="bookmarks">
    <li v-for="url in urls" :key="url">
      <CardBookmark :url="url" :save="save" />
    </li>
  </ul>
</template>
<script setup lang="ts">

const props = defineProps<{
  urls: string[];
  save?: boolean;
}>();

const urls = computed(() => props.urls);
const save = computed(() => props.save || false);

</script>
<style lang="scss" scoped>
.bookmarks {
  >li {
    margin-bottom: 12px;
  }
}
</style>