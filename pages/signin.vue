<template>
  <div class="container column is-8 is-offset-2">
    <section class="section">
      <FormSignin/>
    </section>
  </div>
</template>

<script>

import FormSignin from '~/components/molecules/FormSignin'

export default {
  components: {
    FormSignin
  },
  created() {

    if( this.$isAuthenticated(this.$store) ) this.$router.push('/')

  },

}
</script>
