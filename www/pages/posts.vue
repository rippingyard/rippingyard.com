<template>
  <BlockMain>
    <BlockHeading>
      <AtomTitle>POSTS<small>記事一覧</small></AtomTitle>
    </BlockHeading>
    <OrganismPostList :component="CardPostSimple" />
  </BlockMain>
</template>
<script lang="ts" setup>
import CardPostSimple from '~/components/card/PostSimple.vue';
</script>