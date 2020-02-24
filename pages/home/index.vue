<template>
  <section class="main-content columns">
    <div class="container column is-8 is-offset-2">
      <section class="section">
        <InfoMe/>
        <Wysiwyg/>
      </section>
    </div>
  </section>
</template>

<script>

import InfoMe from '~/components/molecules/InfoMe'
import Wysiwyg from '~/components/atoms/Wysiwyg'

export default {
  components: {
    InfoMe,
    Wysiwyg,
  },
  created() {

    if( !this.$isAuthenticated(this.$store) ) this.$router.push('/')

  },
}
</script>
