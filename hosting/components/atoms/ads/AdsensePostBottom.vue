﻿<template>
  <div class="ad" :class="{dev: !isPrd}">
    <adsbygoogle ad-slot="2832620517" />
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
  min-height: 140px;
  margin-bottom: $gap;
}

</style>
