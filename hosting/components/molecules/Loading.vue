<template>
  <section v-if="isLoading" class="loading">
    <div class="container">
      <p class="logo"><SvgLogo /></p>
      <p class="label">LOADING</p>
    </div>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import SvgLogo from '~/assets/img/logo.svg'
export default Vue.extend({
  components: {
    SvgLogo,
  },
  data() {
    return {
      isLoading: true,
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
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

  .container {
    text-align: center;
    .label {
      font-weight: 800;
      font-size: 1.8rem;
    }
  }

  svg {
    width: 48px;
    height: 48px;
  }

  /deep/ .logo_svg__svg-logo-outer {
    fill: $yellow;
  }
  /deep/ .logo_svg__svg-logo-inner {
    fill: $black;
  }
}
</style>
