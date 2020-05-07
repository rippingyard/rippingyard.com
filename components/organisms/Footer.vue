<template>
  <footer class="footer">
    <div class="columns">
      <div class="container column is-8 is-offset-2">
        <div class="section">
          <nuxt-link to="/">TOP</nuxt-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>

// import SvgLogo from '~/assets/img/logo.svg'

export default {
  components: {
    // SvgLogo
  }
}
</script>

<style lang="scss" scoped>

.footer {
  position: relative;
  background-color: transparent;
  font-family: 'Times New Roman', Times, serif;

  a {
    color: $black;
    &:hover {
      text-decoration: underline;
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
