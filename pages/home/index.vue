<template>
  <section class="main-content columns">
    <div class="container column is-8 is-offset-2">
      <section class="section">
        <InfoMe/>
      </section>
    </div>
  </section>

</template>

<script>

import InfoMe from '~/components/molecules/InfoMe'

export default {
  components: {
    InfoMe,
  },
  created() {

    if( !this.$isAuthenticated(this.$store) ) this.$router.push('/')

  },

}
</script>
