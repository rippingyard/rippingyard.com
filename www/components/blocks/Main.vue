<template>
  <main>
    <slot />
  </main>
</template>
<style lang="scss" scoped>
main {
  position: relative;
  box-sizing: border-box;

  max-width: $mainSize;
  margin: auto;

  @include until($desktop) {
    max-width: $mainSize;
    margin: auto;
  }
}
</style>