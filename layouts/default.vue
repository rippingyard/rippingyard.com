<template>
  <div>
    <Header/>
    <nuxt />
    <Footer/>
  </div>
</template>

<script>

import Header from '~/components/organisms/Header'
import Footer from '~/components/organisms/Footer'

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
    }
  }
}
</script>
