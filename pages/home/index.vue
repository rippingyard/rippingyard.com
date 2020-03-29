<template>
  <section class="main-content columns">
    <div class="container column is-8 is-offset-2">
      <section class="section">
        <InfoMe/>
        <PostForm/>
      </section>
    </div>
  </section>
</template>

<script>

import InfoMe from '~/components/molecules/InfoMe'
import PostForm from '~/components/molecules/PostForm'

export default {
  components: {
    InfoMe,
    PostForm,
  },
  mounted() {

    if( !this.$isAuthenticated(this.$store) ) {
      console.log('Not Logined')
      this.$router.push('/')
    }

  },
}
</script>
