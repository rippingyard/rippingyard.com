<template>
  <div class="header">
    <div class="inner">
      <nuxt-link to="/" class="brand">
        <SvgLogo />
      </nuxt-link>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
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
  margin: 0 auto $navMargin;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 6000;

  .inner {
    position: relative;
    display: flex;
    align-items: center;
    max-width: 100%;
    min-height: $navMargin;
    padding: $navMargin / 4 0;
    background-color: $white;
    border-bottom: 1px solid $black;
  }

  .brand {
    display: none;
    // margin: auto;
    & > svg {
      width: $navMargin / 2;
      height: $navMargin / 2;
    }
  }

  @include until($desktop) {
    width: auto;
    margin: 0 auto;
    .inner {
      background: none;
      border: none;
      margin: 0 $navMargin / 2;
      padding: $navMargin / 2 0 0;
    }
    .brand {
      display: block;
      line-height: 1;
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
    display: none;
    // bottom: 0;
    // &:nth-of-type(1) {
    //   right: 0;
    // }
    // &:nth-of-type(2) {
    //   right: 6px;
    // }
    // &:nth-of-type(3) {
    //   right: 12px;
    // }
    // &:nth-of-type(4) {
    //   right: 18px;
    // }
  }
}
</style>
