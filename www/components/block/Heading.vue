<template>
  <div class="heading">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.heading {
  margin-bottom: $gap * 1.5;

  @include until($desktop) {
    padding: $gap $gap * 0.5 0;
  }
}
</style>