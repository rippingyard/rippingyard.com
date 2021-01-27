<template>
  <div class="manage-heading">
    <h2>{{ label }}</h2>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    label: {
      type: String,
      default: '',
    },
  },
})
</script>
<style lang="scss" scoped>
.manage-heading {
  h2 {
    font-size: 0.8rem;
    font-weight: 800;
    line-height: 1;
    color: $gray-black;
    background-color: $gray;
    // border-bottom: 4px solid $gray-black;
    padding: 30px;
    display: inline-block;
  }
}
</style>
