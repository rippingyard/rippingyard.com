<template>
  <div class="ad">
    <adsbygoogle ad-slot="2832620517" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      // isProd: false
      isProd: process.env.NODE_ENV === 'production'
    }
  }
}
</script>

<style scoped lang="scss">

.ad {
  border: 1px solid $black;
  min-height: 140px;
  padding: 5px;
}

</style>