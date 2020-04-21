<template>
  <div class="brand">
    <nuxt-link to="/">
      <SvgLogo/>
    </nuxt-link>
    <div class="nav">
      <ul v-if="!$isAuthenticated($store)">
        <li><nuxt-link to="/signin">SIGN IN</nuxt-link></li>
        <li><nuxt-link to="/signup">SIGN UP</nuxt-link></li>
      </ul>
      <ul v-else>
        <li><nuxt-link to="/home">HOME</nuxt-link></li>
        <li><a @click="$signOut($store)">SIGN OUT</a></li>
      </ul>
    </div>
  </div>
</template>

<script>

import SvgLogo from '~/assets/img/logo.svg'

export default {
  components: {
    SvgLogo
  },

  data() {
    return {
      // me: this.$store.state.auth.me
    }
  },
  asyncData: (context) => {
    // console.log('Header');
    // console.log('My Name', context.$store.state.auth.me.displayName)
  },

}
</script>

<style lang="scss" scoped>

.brand {

  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;

  svg {
    width: 30px;
    height: 30px;

    // @include until($desktop) {
    //   width: 20px;
    //   height: 20px;
    // }
  }

  > a {
    display: block;
    padding: 20px;
  }

  .nav {
    display: none;
    background-color: $black;
    border-radius: 0 14px 14px 14px;
    width: 220px;
    position: absolute;
    top: 70px;
    left: 20px;

    > ul {
      > li {
        padding: 0 25px;
        > a {
          padding: 20px 0;
          border-bottom: 1px solid $white;
          font-size: 0.84rem;
          font-weight: 800;
          color: $white;
          display: block;
          &:hover {
            color: $yellow;
          }
        }
        &:last-child {
          > a {
            border: none;
          }
        }
      }
    }
  }

  &:hover {
    .nav {
      display: block;
    }
  }
}

</style>

<style lang="scss">

.logo_svg__svg-logo-outer { fill: $black; }
.logo_svg__svg-logo-inner { fill: $white; }

.brand a:hover {
  .logo_svg__svg-logo-outer { fill: $yellow; }
  .logo_svg__svg-logo-inner { fill: $black; }
}

</style>
