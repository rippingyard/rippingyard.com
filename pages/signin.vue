<template>
  <div class="container column is-8 is-offset-2">
    <section class="section">
      <SigninForm/>
    </section>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import SigninForm from '~/components/molecules/SigninForm'

export default {
  components: {
    SigninForm
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
