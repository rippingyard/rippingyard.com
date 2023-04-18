<template>
  <BlockMain>
    <BlockHeading>
      <AtomTitle>POSTS<small>記事一覧</small></AtomTitle>
    </BlockHeading>
    <OrganismPostList :component="CardPostSimple" :limit="25" :types="['article', 'note']" />
  </BlockMain>
</template>
<script lang="ts" setup>
import CardPostSimple from '~/components/card/PostSimple.vue';
import { useHtmlHeader } from '~~/composables/utils/useHtmlHeader';

useHtmlHeader({
  title: () => 'Posts - 記事一覧',
});
</script>