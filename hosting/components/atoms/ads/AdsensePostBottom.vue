<template>
  <div class="ad" :class="{dev: !isPrd}">
    <adsbygoogle ad-slot="2832620517" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      // isProd: false
      isPrd: process.env.NODE_ENV === 'production'
    }
  }
}
</script>

<style scoped lang="scss">

.ad {
  // border: 1px solid $black;
  min-height: 140px;
  // padding: 5px;
  margin-bottom: $gap;
}

.dev {
  .adsbygoogle {
    position: relative;
    background-color: rgba($color: #000, $alpha: 0.1);
    &::before {
      content: 'AD';
      display: block;
      padding: 10px;
      text-decoration: none;
      position: absolute;
      font-weight: 800;
      font-size: 0.8rem;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
    }
  }
}

</style>