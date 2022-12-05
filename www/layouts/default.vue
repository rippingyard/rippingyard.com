<template>
  <div class="wrapper">
    <OrganismNav />
    <slot />
    <OrganismFooter />
    <!-- <Loading :is-loading="isLoading" /> -->
    <BlockToast />
  </div>
</template>
<style lang="scss">
html,
body {
  margin: 0;
  font-size: 14px;
  line-height: 1.8;
  color: $black;
  font-family: $font-normal;
  background-color: $white;
}
</style>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  margin: auto;
  // background-color: #111;
}
</style>