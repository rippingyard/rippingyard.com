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

      // console.log(this.post.owner)
      this.owner = this.getOwner(this.post.owner.id)

      if( !this.owner ) {
        await db.collection('users').doc(this.post.owner.id).get().then(doc => {
          this.owner = doc.data()
          this.$store.commit('user/setUser', this.owner)
        })
      }

    }

    console.log('Owner', this.owner);
    // console.log('postCard', this.post)

  }

}

</script>

