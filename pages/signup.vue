<template>
  <div class="container column is-8 is-offset-2">
    <section class="section">
      <FormSignup/>
    </section>
  </div>
</template>

<script>

import FormSignup from '~/components/molecules/FormSignup'

export default {
  components: {
    FormSignup
  },
  fetch() {

    console.log('NODE_ENV', process.env.NODE_ENV)
    console.log('FIREBASE_CONFIG', process.env.FIREBASE_CONFIG)

  },

}
</script>
