<template>
  <div>
    <ul class="triggers bg-dotted">
      <li v-for="type, i in types" :key="`nav-post-item-${i}-${type.key}`" @click="setType(type.key)">
        {{ type.label }}
      </li>
    </ul>
    <OrganismPostList :component="CardPostRow" :is-mine="true" :filter="filter" :limit="30" />
  </div>
</template>
<script lang="ts" setup>
import CardPostRow from '~/components/card/PostRow.vue';
import { OriginalPost, Post, PostType } from '~/schemas/post';

const types: {
  key: PostType;
  label: string;
}[] = [
    { key: 'log', label: '日記' },
    // { key: 'note', label: 'メモ' },
    { key: 'article', label: '記事' },
  ];

const type = ref<PostType | undefined>();

const filter = (post: OriginalPost) => !type.value ? true : post.type === type.value;

const setType = (value: PostType) => type.value = value;
</script>
<style lang="scss" scoped>
.triggers {
  padding: $gap * 0.5;
  border-bottom: 1px solid $black-transparent-30;

  >li {
    display: inline-block;
    padding: 10px 18px;
    border: 1px solid $black-transparent-30;
    border-right: 0;
    font-size: 0.9rem;
    background-color: $yellow;

    &:last-child {
      border-right: 1px solid $black-transparent-30;
    }
  }
}
</style>