<template>
  <div>
    <Header/>
    <InfoMe/>
    <nuxt />
  </div>
</template>

<script>

import Header from '~/components/organisms/Header'
import InfoMe from '~/components/molecules/InfoMe'

export default {
  components: {
    Header,
    InfoMe,
  },
  data() {
    return {
    }
  }
}
</script>
