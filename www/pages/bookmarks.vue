<template>
  <BlockMain>
    <BlockHeading>
      <AtomTitle>BOOKMARKS<small>ブックマーク一覧</small></AtomTitle>
    </BlockHeading>
    <OrganismBookmarkList :limit="100" />
  </BlockMain>
</template>
<script lang="ts" setup>
import { useHtmlHeader } from '~~/composables/utils/useHtmlHeader';

useHtmlHeader({
  title: () => 'Bookmarks - ブックマーク一覧',
});
</script>