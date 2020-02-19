<template>
  <div class="container column is-8 is-offset-2">
    <section class="section">
      <FormLogin/>
    </section>
  </div>
</template>

<script>

import FormLogin from '~/components/molecules/FormLogin'

export default {
  components: {
    FormLogin
  },
  fetch() {

    console.log('NODE_ENV', process.env.NODE_ENV)
    console.log('FIREBASE_CONFIG', process.env.FIREBASE_CONFIG)

  },

}
</script>
