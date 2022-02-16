<template>
  <div class="manifest bg-dotted">
    <h2 v-html="title"></h2>
    <p class="caption" v-html="subtitle"></p>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
})
</script>
<style lang="scss" scoped>
.manifest {
  // background-color: $black;
  border-bottom: 1px solid $black;
  padding: $navMargin * 0.75 $navMargin / 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // min-height: $navSize;
  > h2 {
    font-size: 2.2rem;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 3px;
  }
  > .caption {
    font-size: 0.8rem;
  }
}
</style>