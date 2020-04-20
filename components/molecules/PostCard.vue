<template>
  <div class="card">
    <!-- <div class="card-image">
      <figure class="image is-4by3">
        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
      </figure>
    </div> -->
    <div class="card-content">
      <div class="content">
        <div v-html="post.content" class="wysiwyg"></div>
        <!-- <p><a href="#">#css</a> <a href="#">#responsive</a></p> -->
        <!-- <time datetime="2016-1-1">{{ post.createdate.format('YYYY-MM-DD HH:mm:ss') }}</time> -->
        <p><nuxt-link :to="post.permalink">permalink</nuxt-link></p>
      </div>
      <div class="media">
        <!-- <div class="media-left">
          <figure class="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
          </figure>
        </div> -->
        <div v-if="owner" class="media-content">
          <p class="title is-4">{{ owner.displayName }}</p>
          <p class="subtitle is-6">@{{ owner.userName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { db } from '~/plugins/firebase'

export default {

  props: {
    post: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      owner: null
    }
  },

  computed: {
    ...mapGetters({
      normalize: 'post/normalize',
      getOwner: 'user/owner',
    }),
  },

  async created() {

    this.post = this.normalize( this.post )

    if( this.post.owner ) {

      console.log(this.post.owner)
      this.owner = this.getOwner(this.post.owner.id)

      if( !this.owner ) {
        await db.collection('users').doc(this.post.owner.id).get().then(doc => {
          this.owner = doc.data()
          this.$store.commit('user/setUser', this.owner)
        })
      } else {
        console.log('cached!!')
      }

    }

    console.log('Owner', this.owner);
    // console.log('postCard', this.post)

  }

}

</script>

