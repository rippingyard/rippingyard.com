<template>
  <section class="modal">
    <div class="overlay" @click="onClose()"></div>
    <div class="inner">
      <button class="close" @click="onClose()">
        <fa-icon :icon="['far', 'times-circle']" class="icon" />
      </button>
      <div class="frame">
        <slot />
      </div>
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
    },
  },
})
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 50px 0;
  z-index: 20000;

  .inner {
    position: relative;
    max-width: $mainSize + 120px;
    background-color: $white;
    // padding: $gap * 2;
    z-index: 100;
    // border-radius: 10px;
    margin: auto;
  }

  .frame {
    position: relative;
    height: 100%;
    z-index: 200;
    padding: 0;
    // border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    overflow-y: auto;
  }

  .overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: $black, $alpha: 0.8);
    z-index: 10;
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