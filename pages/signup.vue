<template>
  <div class="container column is-8 is-offset-2">
    <section class="section">
      <SignupForm/>
    </section>
  </div>
</template>

<script>

import SignupForm from '~/components/molecules/SignupForm'

export default {
  components: {
    SignupForm
  },
  fetch() {



    // console.log('NODE_ENV', process.env.NODE_ENV)
    // console.log('FIREBASE_CONFIG', process.env.FIREBASE_CONFIG)

  },

}
</script>
