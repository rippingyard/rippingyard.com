<template>
  <a :href="url" class="tweetButton" target="_blank"><i class="fab fa-twitter"></i> Tweet</a>
</template>
<script>
export default {
  props: {
    href: {
      default: '',
      type: String,
    },
    title: {
      default: 'rippingyard',
      type: String,
    }
  },
  data() {
    return {
      url: `http://twitter.com/intent/tweet?text=${ this.title }&url=${ this.href }&via=rippingyard`
    }
  }
}
</script>
<style lang="scss" scoped>
.tweetButton {
  background: #00aced;
  color: $white;
  display: inline-block;
  max-width: 200px;
  padding: 10px 25px;
}
</style>