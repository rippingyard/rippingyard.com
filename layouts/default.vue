<template>
  <div>
    <Header/>
    <nuxt />
  </div>
</template>

<style lang="scss">

// html,
// body {
//   background-color: $yellow;
// }

</style>

<script>

import Header from '~/components/organisms/Header'

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
