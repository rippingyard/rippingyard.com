<template>
  <section class="postheader">
    <Belt/>

    <div v-if="getTitle" class="container column is-8 is-offset-2">
      <Title :title="getTitle"/>

      <ul class="data">
        <li class="datetime"><strong>DATE</strong> {{ post.publishedAt }}</li>
        <li v-if="post.owner" class="by"><strong>POSTED BY</strong> {{ post.owner.displayName }}</li>
        <li v-if="post.length" class="length"><strong>LENGTH</strong> {{ post.length }}</li>
      </ul>
    </div>

  </section>
</template>

<style scoped lang="scss">

.postheader {

  width: 100%;
  padding: 80px 40px 40px;
  // background-color: $orange;

  @include until($tablet) {
    padding: 50px 40px 20px;
  }

  .column {
    padding: 0 15px;

    @include until($tablet) {
      padding: 0;
    }
  }

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
  props: {
    post: {
      default: null,
      type: Object
    }
  },
  computed: {
    getTitle() {
      return getTitle( this.post.content )
    }
  },
  

}
</script>
