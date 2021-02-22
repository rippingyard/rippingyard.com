<template>
  <div class="header" :class="{ 'is-wide': isWide }">
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
  props: {
    isWide: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.header {
  z-index: 10000;
  position: relative;
  max-width: 780px;
  margin: 40px auto 120px;

  &.is-wide {
    max-width: 100%;
  }

  .brand {
    svg {
      width: 30px;
      height: 30px;
    }
  }

  @include mobile {
    margin: ($gap / 2) auto 40px;
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
