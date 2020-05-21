<template>
  <div v-if="isProd" class="ad">
    <adsbygoogle ad-slot="2832620517" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      isProd: false
      // isProd: process.env.NODE_ENV === 'production' && window.location.hostname === 'www.rippingyard.com'
    }
  }
}
</script>

<style scoped>

.ad {
  border: 1px solid $black;
}

</style>