<template>
  <main :class="classes">
    <slot />
  </main>
</template>
<script lang="ts" setup>

const props = defineProps<{
  isCliff?: boolean;
}>();

const classes = {
  'is-cliff': props.isCliff || false,
};

</script>
<style lang="scss" scoped>
main {
  position: relative;
  box-sizing: border-box;

  max-width: $mainSize;
  margin: $gap auto;

  &.is-cliff {
    margin-top: 0;
    margin-bottom: 0;
  }

  @include until($desktop) {
    max-width: $mainSize;
    margin: auto;
  }
}
</style>