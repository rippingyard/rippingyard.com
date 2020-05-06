<template>
  <section class="postheader">

    <div class="container column is-8 is-offset-2">
      <Title :title="getTitle"/>
    </div>

  </section>
</template>

<style scoped lang="scss">

.postheader {

  width: 100%;
  padding: 80px 40px;
  background-color: $yellow;
  
}

</style>

<script>

import { getTitle, removeTitle } from '~/plugins/typography'
import Title from '~/components/atoms/PostTitle'

export default {
  components: {
    Title,
  },
  computed: {
    getTitle() {
      return getTitle( this.post.content )
    }
  },
  props: {
    post: {
      default: {}
    }
  }

}
</script>
