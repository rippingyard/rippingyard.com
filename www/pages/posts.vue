<template>
  <BlockMain>
    <BlockHeading>
      <AtomTitle>POSTS<small>記事一覧</small></AtomTitle>
    </BlockHeading>
    <OrganismPostList :component="ItemPostSimple" />
  </BlockMain>
</template>
<script lang="ts" setup>
import ItemPostSimple from '~/components/item/PostSimple.vue';
</script>