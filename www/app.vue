<template>
  <div class="wrapper">
    <OrganismNav :toTop="toTop" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
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
  height: 100%;
  margin: auto;
  // position: absolute;
  overflow-y: auto;
}
</style>