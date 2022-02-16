<template>
  <div class="search">
    <NavHeader title="SEARCH" subtitle="検索" />
    <div class="input">
      <fa-icon icon="search" class="icon" />
      <input v-model="query" type="text" placeholder="検索ワードを入力する" />
    </div>
    <div class="test">{{ query }}</div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

type DataType = {
  query: string
}

export default Vue.extend({
  data(): DataType {
    return {
      query: '',
    }
  },
})
</script>
<style lang="scss" scoped>
.search {
  // background-color: $black;
  height: 100%;

  .input {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid $black;
    padding: 22px 18px;
    font-size: 2.8rem;
    font-weight: 800;
    line-height: 1;
    > .icon {
      margin-right: 14px;
      font-size: 2.2rem;
    }
    > input {
      border: none;
      width: 100%;
    }
  }
}
</style>