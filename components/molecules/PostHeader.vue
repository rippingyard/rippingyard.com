<template>
  <section class="postheader">
    <Belt/>

    <div class="container column is-8 is-offset-2">
      <Title :title="getTitle"/>

      <ul class="data">
        <li class="datetime"><strong>DATE</strong> 2020-04-30 11:00</li>
        <li class="by"><strong>POSTED BY</strong> mcatm</li>
        <li class="length"><strong>LENGTH</strong> 1400</li>
      </ul>
    </div>

  </section>
</template>

<style scoped lang="scss">

.postheader {

  width: 100%;
  padding: 80px 40px 40px;
  // background-color: $orange;

  .data {
    margin-top: 40px;
    color: $black;
    font-size: 10px;
    position: relative;

    &:before {
      content: "";
      width: 28px;
      height: 1px;
      background-color: $black;
      position: absolute;
      top: -10px;
      left: 0;
    }

    strong {
      font-weight: 800;
      padding-right: 10px;
    }
  }
  
}

</style>

<script>

import { getTitle, removeTitle } from '~/plugins/typography'
import Title from '~/components/atoms/PostTitle'
import Belt from '~/components/atoms/Belt/Readable'

export default {
  components: {
    Title,
    Belt,
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
