<template>
  <footer class="block container">
    <p class="copyright"><nuxt-link to="/">&copy; rippingyard</nuxt-link></p>
  </footer>
</template>
<style lang="scss" scoped>
footer {
  padding: 120px 0;
  text-align: center;
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
