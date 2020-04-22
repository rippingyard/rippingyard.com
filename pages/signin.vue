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
  head: () => {
    return {
      title: 'Sign In'
    }
  },
  created() {

    // console.log('Authed?', this.isAuthenticated)

    if( this.isAuthenticated ) {
      this.$buefy.notification.open({
        duration: 5000,
        message: 'ログイン済みです',
        position: 'is-bottom-right',
        type: 'is-warning',
        hasIcon: false
      })
      this.$router.push('/')
    }

  },
}
</script>
