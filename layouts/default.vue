<template>
  <div>
    <Header/>
    <nuxt />
  </div>
</template>

<script>

import Header from '~/components/organisms/Header'
// import Footer from '~/components/organisms/Footer'

export default {
  components: {
    Header,
  },
  data() {
    return {
    }
  }
}
</script>
