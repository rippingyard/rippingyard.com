<template>
  <main :class="classes">
    <slot />
  </main>
</template>
<script lang="ts" setup>

const props = defineProps<{
  isCliff?: boolean;
  horizontalSize?: 'normal' | 'large';
}>();

console.log('props', props);

const classes = [
  {
    'is-cliff': props.isCliff || false,
  },
  props.horizontalSize || 'normal',
];

</script>
<style lang="scss" scoped>
main {
  position: relative;
  box-sizing: border-box;

  max-width: $mainSize;
  margin: $gap auto;

  &.large {
    max-width: $mainSize + (($gap + $navSize) * 2);
    padding-left: $navSize + $gap;
  }

  &.is-cliff {
    margin-top: 0;
    margin-bottom: 0;
  }

  @include until($desktop) {
    max-width: $mainSize;
    margin: auto;

    &.large {
      max-width: $mainSize;
      padding-left: 0;
    }
  }
}
</style>