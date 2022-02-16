<template>
  <div class="header">
    <nuxt-link to="/" class="brand">
      <SvgLogo />
    </nuxt-link>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import SvgLogo from '~/assets/img/logo.svg'

export default Vue.extend({
  components: {
    SvgLogo,
  },
  props: {
    image: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
.header {
  display: none;
  position: fixed;
  line-height: 1;
  top: 0;
  left: 0;
  width: 100%;
  background-color: $white;
  padding: $mobileHeaderHeight / 4 0;
  height: $mobileHeaderHeight;
  // mix-blend-mode: multiply;
  text-align: center;
  z-index: 6000;

  .brand {
    display: inline-block;
    margin: auto;
  }

  svg {
    width: $mobileHeaderHeight / 2;
    height: $mobileHeaderHeight / 2;
  }

  @include until($desktop) {
    display: block;
  }
}
</style>

<style lang="scss">
.logo_svg__svg-logo-outer {
  fill: $black;
}
.logo_svg__svg-logo-inner {
  fill: $white;
}

.brand a:hover {
  // .logo_svg__svg-logo-outer { fill: $yellow; }
  .logo_svg__svg-logo-inner {
    fill: $yellow;
  }
}
</style>
