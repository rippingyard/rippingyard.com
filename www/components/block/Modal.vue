<template>
  <section class="modal">
    <div class="overlay" @click="() => props.onClose()" />
    <div class="inner">
      <button class="close" @click="() => props.onClose()">
        <IconClose />
      </button>
      <div class="frame">
        <slot />
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>

type Props = {
  onClose: () => void;
};

const props = withDefaults(
  defineProps<Props>(),
  {
    onClose: () => undefined,
  }
);
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
    background-color: $white;
    z-index: 100;
    max-width: $mainSize + $navMargin + (($navSize + $navMargin) * 2);
    width: 100%;
    height: calc(100% - #{$navMargin});
    position: fixed;
    top: $navMargin * 0.5;
    left: calc(50vw - #{($mainSize * 0.5) + $navSize + ($navMargin * 1.5)});
    overflow: hidden;
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

    >.icon {
      font-size: 2rem;
    }
  }
}
</style>