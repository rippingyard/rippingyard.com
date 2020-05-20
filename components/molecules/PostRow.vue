<template>
  <div class="row">
    <div class="row-container">
      <nuxt-link :to="post.permalink">
        <div v-if="getTitle" class="row-title">{{ getTitle }}</div>
        <div v-html="getSummary" class="row-summary"></div>
      </nuxt-link>
      <div class="row-footer">
        <p v-if="owner" class="row-owner">POSTED BY <strong>{{ owner.displayName }}</strong></p>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { db } from '~/plugins/firebase'

import { getTitle, getSummary, getLength } from '~/plugins/typography'

export default {

  props: {
    post: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      owner: null,
      title: null,
    }
  },

  computed: {
    ...mapGetters({
      normalize: 'post/normalize',
      getOwner: 'user/owner',
    }),
    getTitle() {
      return getTitle( this.post.content )
    },
    getSummary() {
      return getSummary( this.post.content )
    },
  },

  async created() {

    this.post = this.normalize( this.post )

    if( this.post.owner ) {

      this.owner = await this.getOwner(this.post.owner.id)

    }

  }

}

</script>

