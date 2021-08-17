<template>
  <div class="ad" :class="{dev: !isPrd}">
    <adsbygoogle ad-slot="3474759621" />
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
  @include mobile {
    margin-bottom: $gap / 2;
  }
}

</style>
