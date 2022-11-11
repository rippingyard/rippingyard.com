<template>
  <svg version="1.1" :class="[props.color, props.size, 'loadingIcon']" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 52 52"
    style="enable-background: new 0 0 52 52" xml:space="preserve">
    <path class="loading__front" d="M51,26c0,13.8-11.2,25-25,25S1,39.8,1,26S12.2,1,26,1S51,12.2,51,26z" />
    <path class="loading__back" d="M51,26c0,13.8-11.2,25-25,25S1,39.8,1,26S12.2,1,26,1S51,12.2,51,26z" />
  </svg>
</template>
<script lang="ts" setup>

type Props = {
  color?: 'white' | 'black' | 'yellow';
  size?: 'medium' | 'large';
};

const props = withDefaults(
  defineProps<Props>(),
  {
    color: 'black',
    size: 'large',
  }
);

</script>
<style lang="scss" scoped>
.loadingIcon {
  animation: rotate-transition 1s ease-in-out infinite;

  .loading__front {
    fill: none;
    // stroke: $white;
    stroke: #FFF;
    stroke-width: 1;
    // stroke-miterlimit: 10;
    stroke-dasharray: 65% 295%;
  }

  .loading__back {
    fill: none;
    stroke: #FFF;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke-opacity: 0.5;
  }

  &.black {

    .loading__front,
    .loading__back {
      stroke: #111;
    }

    .loading__back {
      stroke-opacity: 0.2;
    }
  }

  &.yellow {

    .loading__front,
    .loading__back {
      stroke: #FF2;
    }
  }

  &.small {
    width: 24px;
  }

  &.medium {
    width: 56px;
  }

  &.large {
    width: 80px;
  }
}

@keyframes rotate-transition {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
