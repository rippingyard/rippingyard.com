<template>
  <div class="header">
    <!-- <div class="brand">
      <nuxt-link to="/">
        <SvgLogo />
      </nuxt-link>
    </div> -->
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
// import SvgLogo from '~/assets/img/logo.svg'

export default Vue.extend({
  // components: {
  //   SvgLogo,
  // },
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
  position: relative;
  display: flex;
  align-items: center;
  max-width: 100%;
  height: $navMargin;
  margin: 0 auto $navMargin;
  padding-left: $navMargin;
  background-color: $black;

  background-size: cover;
  background-position: 50% 50%;

  // &::before {
  //   content: '';
  //   position: absolute;
  //   width: 70%;
  //   height: $navSize;
  //   // background-color: $black;
  //   bottom: -12px;
  //   right: -12px;

  //   background: radial-gradient(rgba($yellow, 0.6) 1px, transparent 1px),
  //     radial-gradient(rgba($cyan, 0.6) 1px, transparent 1px), transparent;
  //   background-size: 14px 14px, 14px 14px;
  //   background-position: 2px 2px, 9px 9px, 2px 2px;
  // }

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
    background: none;
    margin: 0;
    height: 18px;
    .brand {
      display: none;
    }
  }
}

.box {
  width: 6px;
  height: 18px;
  bottom: -9px;
  position: absolute;
  &:nth-of-type(1) {
    right: 30px;
    background-color: $yellow;
  }
  &:nth-of-type(2) {
    right: 36px;
    background-color: $blue;
  }
  &:nth-of-type(3) {
    right: 42px;
    background-color: $orange;
  }
  &:nth-of-type(4) {
    right: 48px;
    background-color: $green;
  }
  @include until($desktop) {
    bottom: 0;
    &:nth-of-type(1) {
      right: 0;
    }
    &:nth-of-type(2) {
      right: 6px;
    }
    &:nth-of-type(3) {
      right: 12px;
    }
    &:nth-of-type(4) {
      right: 18px;
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
