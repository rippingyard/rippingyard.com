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
  // z-index: 10000;
  position: relative;
  display: flex;
  align-items: center;
  max-width: 100%;
  height: $navSize;
  margin: $navMargin auto $navMargin;
  padding-left: $navMargin;
  background-color: $cyan;

  background-size: cover;
  background-position: 50% 50%;

  &::before {
    content: '';
    position: absolute;
    width: 70%;
    height: $navSize;
    // background-color: $black;
    bottom: -12px;
    right: -12px;

    background: radial-gradient(rgba($black, 0.6) 1px, transparent 1px),
      radial-gradient(rgba($black, 0.6) 1px, transparent 1px), transparent;
    background-size: 14px 14px, 14px 14px;
    background-position: 2px 2px, 9px 9px, 2px 2px;
  }

  &.is-wide {
    max-width: 100%;
  }

  .brand {
    mix-blend-mode: multiply;
    svg {
      width: 30px;
      height: 30px;
    }
  }

  @include until($desktop) {
    margin-top: 0;
    margin-bottom: $navMargin / 2;
    height: $navSize * 0.5;
    &::before {
      height: $navSize * 0.5;
    }
    .brand {
      display: none;
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
