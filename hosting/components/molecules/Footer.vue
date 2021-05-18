<template>
  <footer class="block container">
    <ul class="links">
      <li><nuxt-link to="/">TOP</nuxt-link></li>
      <li><nuxt-link to="/home">HOME</nuxt-link></li>
      <li><nuxt-link to="/seeds">SEEDS</nuxt-link></li>
    </ul>
    <ul class="links small">
      <li><nuxt-link to="/login">ログイン</nuxt-link></li>
      <li><nuxt-link to="/terms">利用規約</nuxt-link></li>
      <li><nuxt-link to="/privacy">プライバシーポリシー</nuxt-link></li>
    </ul>
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
.links {
  text-align: center;
  > li {
    display: inline-block;
    font-size: 0.9rem;
    padding-left: 16px;
    position: relative;
    &::before {
      content: '';
      display: block;
      width: 8px;
      height: 1px;
      background-color: $black;
      position: absolute;
      top: 10px;
      left: 2px;
    }
    &:first-child {
      padding-left: 0;
      &::before {
        display: none;
      }
    }
  }
  &.small {
    > li {
      font-size: 0.8rem;
    }
  }
}
.copyright {
  font-size: 0.8rem;
}
</style>
