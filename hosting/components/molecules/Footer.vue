<template>
  <footer class="block container">
    <p class="copyright">&copy; rippingyard</p>
  </footer>
</template>
<style lang="scss" scoped>
footer {
  padding: 50px 0 120px;
}
.block.container {
  @include mobile {
    padding: 50px ($gap / 2) 120px;
  }
}
.copyright {
  font-size: 0.8rem;
}
</style>
