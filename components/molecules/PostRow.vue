<template>
  <div class="row">
    <div class="row-container">
      <nuxt-link :to="post.permalink">
        <div v-if="getTitle" v-html="getTitle" class="row-title"></div>
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

import { stripTags, getTitle, getSummary, getLength } from '~/plugins/typography'

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
      getOwner: 'user/owner',
    }),
    getTitle() {
      return stripTags( getTitle( this.post.content ) )
    },
    getSummary() {
      return getSummary( this.post.content )
    },
  },

  async created() {

    if( this.post.owner ) {

      this.owner = await this.getOwner(this.post.owner.id)

    }

  }

}

</script>

