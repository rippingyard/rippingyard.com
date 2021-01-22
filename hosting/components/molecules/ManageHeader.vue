<template>
  <div class="header">
    <div class="brand">
      <nuxt-link to="/">
        <SvgLogo />
      </nuxt-link>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import SvgLogo from '~/assets/img/logo.svg'

export default Vue.extend({
  components: {
    SvgLogo,
  },
})
</script>

<style lang="scss" scoped>
.header {
  z-index: 10000;
  position: relative;
  width: 100%;
  background-color: $gray;
  // border-bottom: 1px solid $gray;
  // margin: 40px auto 120px;

  .brand {
    // position: fixed;
    // top: 5px;
    // left: 5px;
    width: 64px;

    a {
      display: block;
      line-height: 1;
      padding: 20px;
      // border-right: 1px solid $gray;
    }

    svg {
      width: 22px;
      height: 22px;
    }
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
