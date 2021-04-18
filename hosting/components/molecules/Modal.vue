<template>
  <section class="modal">
    <div class="overlay" @click="onClose()"></div>
    <div class="inner block container">
      <button class="close" @click="onClose()"><fa-icon :icon="['far', 'times-circle']" class="icon" /></button>
      <slot></slot>
    </div>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    onClose: {
      type: Function,
      default: () => {},
    }
  },
  // methods: {
  //   close() {
  //     this.show = false
  //   }
  // }
})
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 50px 0;
  z-index: 20000;
  
  .inner {
    position: relative;
    background-color: $white;
    // padding: $gap * 2;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    z-index: 20001;
  }

  .overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: $black, $alpha: 0.8);
    z-index: 20000;
  }
  
  .close {
    position: absolute;
    top: 0;
    left: -40px;
    color: $white;
    > .icon {
      font-size: 2rem;
    }
  }
}
</style>