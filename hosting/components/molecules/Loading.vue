<template>
  <transition>
    <section v-if="isLoading" class="loading">
      <p class="logo icon"><SvgLogo /></p>
      <p class="logo"><IconLoading size="large" color="yellow" /></p>
    </section>
  </transition>
</template>
<script lang="ts">
import Vue from 'vue'
import SvgLogo from '~/assets/img/logo.svg'

export default Vue.extend({
  components: {
    SvgLogo,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: true,
    },
  },
})
</script>
<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $black;
  z-index: 9999999999999;
  color: $yellow;
  display: flex;
  justify-content: center;
  align-items: center;

  .logo {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  }

  // .container {
  //   text-align: center;
  //   position: relative;
  //   .logo {
  //     position: absolute;
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //   }
  //   .label {
  //     display: none;
  //     font-weight: 800;
  //     font-size: 1.8rem;
  //   }
  // }

  .icon {
    svg {
      width: 48px;
      height: 48px;
    }
  }

  /deep/ .logo_svg__svg-logo-outer {
    // fill: $white;
    fill: $yellow;
  }
  /deep/ .logo_svg__svg-logo-inner {
    fill: $black;
  }
}
</style>
