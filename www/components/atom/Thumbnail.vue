<template>
  <span v-if="!!props.image" class="image" :class="[size, { 'is-square': isSquare }]" :style="bgImage" />
</template>
<script lang="ts" setup>

type Size = 'medium' | 'small';

type Props = {
  image: string;
  size?: Size;
  isSquare?: boolean;
}

const props = defineProps<Props>();

const bgImage = computed(() => `background-image:url(${props.image})`);
const size = computed<Size>(() => props.size || 'medium');
const isSquare = computed(() => props.isSquare || false);
</script>
<style lang="scss" scoped>
.image {
  width: 110px;
  height: 110px;
  display: block;
  margin: auto;
  border-radius: 999999px;
  border: 1px solid $gray-black;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;

  &.small {
    width: 40px;
    height: 40px;
  }

  &.is-square {
    border-radius: 0;
  }

  @include until-desktop {
    flex-direction: row;
    padding: $gap * 0.5 0 0;
    width: 100%;
    height: 50vw;
    border-radius: 0;
    border: none;
    margin: 0;
  }
}
</style>
