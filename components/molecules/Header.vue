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
  max-width: 780px;
  margin: 40px auto 120px;

  .brand {
    // position: fixed;
    // top: 5px;
    // left: 5px;

    svg {
      width: 30px;
      height: 30px;
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
