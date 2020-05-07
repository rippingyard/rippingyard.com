<template>
  <header class="header">
    <div class="brand">
      <nuxt-link to="/">
        <SvgLogo/>
      </nuxt-link>
      <div class="nav">
        <ul v-if="!$isAuthenticated($store)">
          <li><nuxt-link to="/signin">SIGN IN</nuxt-link></li>
          <!-- <li><nuxt-link to="/signup">SIGN UP</nuxt-link></li> -->
        </ul>
        <ul v-else>
          <li><nuxt-link to="/home">HOME</nuxt-link></li>
          <li><a @click="$signOut($store)">SIGN OUT</a></li>
        </ul>
      </div>
    </div>
    <div class="tagline">
      <span class="tagline-body">lifelog for living well</span>
      <span class="tagline-title">ripping yard</span>
    </div>
  </header>
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

.header {
  z-index: 10000;
  position: relative;
}

.brand {

  position: fixed;
  top: 5px;
  left: 5px;

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
    border-radius: 50%;
    line-height: 1;
    &:hover {
      background-color: $yellow;
    }
  }

  .nav {
    display: none;
    background-color: $black;
    border-radius: 0 14px 14px 14px;
    width: 220px;
    position: absolute;
    top: 70px;
    left: 30px;

    &:before {
      content: '';
      width: 0;
      height: 0;
      border-top: 5px solid transparent;
      border-left: 5px solid $black;
      border-right: 5px solid transparent;
      border-bottom: 5px solid $black;
      position: absolute;
      top: -10px;
    }

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

.tagline {
  transform: rotate(90deg);
  font-size: 13px;
  font-family: 'Times New Roman', Times, serif;
  position: fixed;
  bottom: 160px;
  left: -110px;
  line-height: 1;
  color: $black;

  .tagline-title {
    position: relative;
    padding-left: 120px;
    &:before {
      content: '';
      border-bottom: 1px solid $black;
      width: 100px;
      position: absolute;
      left: 10px;
      top: 8px;
    }
  }
}

</style>

<style lang="scss">

.logo_svg__svg-logo-outer { fill: $black; }
.logo_svg__svg-logo-inner { fill: $white; }

.brand a:hover {
  // .logo_svg__svg-logo-outer { fill: $yellow; }
  .logo_svg__svg-logo-inner { fill: $yellow; }
}

</style>
