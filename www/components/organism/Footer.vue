<template>
  <BlockMain>
    <footer>
      <ul class="links">
        <li v-for="link, i of links.main" :key="`footer-link-main-${i}`">
          <nuxt-link :to="link.to">{{ link.label }}</nuxt-link>
        </li>
      </ul>
      <ul class="links small">
        <li v-for="link, i of links.sub" :key="`footer-link-sub-${i}`">
          <nuxt-link :to="link.to">{{ link.label }}</nuxt-link>
        </li>
      </ul>
      <p class="copyright">
        <nuxt-link to="/">&copy; rippingyard</nuxt-link>
      </p>
    </footer>
  </BlockMain>
</template>
<script lang="ts" setup>

const links = {
  main: [
    { label: 'TOP', to: '/' },
    { label: 'POSTS', to: '/posts' },
    // {label: 'HOME', to: '/home'},
    { label: 'SEEDS', to: '/seeds' },
  ],
  sub: [
    { label: 'ログイン', to: '/login' },
    { label: '利用規約', to: '/terms' },
    { label: 'プライバシーポリシー', to: '/privacy' },
  ]
}

</script>
<style lang="scss" scoped>
footer {
  padding: 120px 0 0;
  text-align: left;

  @include until($desktop) {
    padding: 120px 15px 80px;
  }
}

// .block.container {
//   @include mobile {
//     padding: 50px ($gap * 0.5) 120px;
//   }
// }

.links {
  text-align: left;

  >li {
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
    >li {
      font-size: 0.8rem;
    }
  }
}

.copyright {
  margin-top: 40px;
  font-size: 0.8rem;
}
</style>
