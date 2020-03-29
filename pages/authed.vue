<template>
  <section class="main-content columns">
    <div class="container column is-8 is-offset-2">
      <section class="section">
        <SigninForm/>
      </section>
    </div>
  </section>

</template>

<script>

import SigninForm from '~/components/molecules/SigninForm'

export default {
  components: {
    SigninForm,
  },
  created() {

    // console.log('NODE_ENV', process.env.NODE_ENV)
    // console.log('FIREBASE_CONFIG', process.env.FIREBASE_CONFIG)

  },

}
</script>
