<template>
  <div class="outer" ref="el">
    <div class="inner">
      <p>
        <span>{{ x }}:{{ y }}</span>
        <span>{{ directions }}</span>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useScroll } from '@vueuse/core'

const el = ref<HTMLElement | null>(null)
const { x, y, isScrolling, arrivedState, directions } = useScroll(el)
</script>
<style lang="scss" scoped>
.outer {
  width: 100%;
  height: 100vh;
  position: absolute;
  // z-index: 1000000;
  margin: auto;
  overflow-y: scroll;

  // background-color: #111;
  .inner {
    height: 200vh;
    width: 100%;
    background-color: #904;
    display: flex;
    align-items: center;
    justify-content: center;

    >p {
      width: 50%;
      border: 1px solid #111;
      padding: 10px;
    }
  }
}
</style>