<template>
  <p class="date">最終更新日：{{ date }}</p>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    date: {
      type: String,
      default: '',
    }
  }
})
</script>
<style lang="scss" scoped>
.heading {
  margin-bottom: $gap * 1.5;
  h1 {
    font-size: 2.2rem;
    line-height: 1.4;
    font-weight: 800;
    padding-top: 3rem;
  }
  .date {
    font-size: 0.8rem;
    color: $gray-black;
    padding-top: 5px;
  }
}
</style>