<template>
  <p class="trigger" @click="click">
    <span class="line"></span>
    <span class="line"></span>
    <span class="line"></span>
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
  position: absolute;
  top: 0;
  left: -50px;
  width: 50px;
  height: 50px;
  padding: 16px;
  background-color: $black;
  z-index: 100;
  &:hover {
    cursor: pointer;
  }
  .line {
    display: block;
    width: calc(100% - 30px);
    height: 2px;
    background-color: $white;
    position: absolute;
    &:first-child {
      top: 14px;
      width: calc(100% - 30px);
    }
    &:nth-child(2) {
      top: 23px;
      width: calc(90% - 30px);
    }
    &:nth-child(3) {
      top: 32px;
      width: calc(80% - 30px);
    }
  }
  @include mobile {
    top: auto;
    bottom: 0;
  }
}
</style>
