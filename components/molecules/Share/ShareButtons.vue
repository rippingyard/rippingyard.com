<template>
  <div class="share">
    <TweetButton :href="href" :title="title" />
  </div>
</template>
<script>
import TweetButton from '~/components/atoms/Share/Tweet'

export default {
  components: {
    TweetButton,
  },
  props: {
    href: {
      default: '',
      type: String,
    },
    title: {
      default: 'rippingyard',
      type: String,
    }
  }
}
</script>
<style lang="scss" scoped>

.share {
  padding: 40px 0 40px;
}

</style>