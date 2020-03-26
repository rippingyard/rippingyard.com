<template>
  <div class="container column is-8 is-offset-2">
    <section class="section">
      <FormSignin/>
    </section>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import FormSignin from '~/components/molecules/FormSignin'

export default {
  components: {
    FormSignin
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    })
  },
  updated() {

    // console.log('Authed?', this.isAuthenticated)

    if( this.isAuthenticated ) {
      console.log('Logined!')
      this.$router.push('/')
    }

  },
}
</script>
