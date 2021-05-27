<template>
  <div class="ad" :class="{dev: !isPrd}">
    <adsbygoogle ad-slot="5708290274" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      isPrd: process.env.NODE_ENV === 'production'
    }
  }
}
</script>

<style scoped lang="scss">

.ad {
  min-height: 90px;
  margin-bottom: $gap;
}

</style>
