<template>
  <p class="trigger" @click="click">
    <fa-icon icon="comment-alt" class="icon" />
  </p>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    click: {
      type: Function,
      default: () => {},
    },
  },
})
</script>
<style lang="scss" scoped>
.trigger {
  position: fixed;
  bottom: 10px;
  right: 15px;
  width: 40px;
  height: 40px;
  padding: 11px;
  background-color: $black;
  color: $white;
  z-index: 100;
  border-radius: 2999px;
  .icon {
    font-size: 1.2rem;
  }
  &:hover {
    cursor: pointer;
  }
  @include mobile {
    top: auto;
    bottom: 0;
  }
}
</style>
