<template>
  <section class="section">
    <p class="menu-label is-hidden-touch">Latest Posts</p>
    <div class="list">
      <div class="list-container">
        <b-loading :active.sync="isLoading" :is-full-page="false"></b-loading>
        <b-table
          ref="table"
          :data="posts"
          :default-sort="['createdAt', 'desc']"
          sticky-header
          paginated
          per-page="999"
          pagination-position="both"
        >

          <template slot-scope="props">

            <b-table-column field="content" label="タイトル">
              <strong>{{ getTitle(props.row.content) }}</strong>
              <nuxt-link :to="getEditLink(props.row.id)">編集</nuxt-link>
            </b-table-column>
          </template>

        </b-table>
      </div>
    </div>
  </section>
</template>

<script>

import { mapGetters } from 'vuex'
import { db } from '~/plugins/firebase'
import { normalize } from '~/store/post'

import { getTitle } from '~/plugins/typography'

export default {
  components: {
    // PostTableRow,
  },
  props: {
    isTimeline: {
      type: Boolean,
      default: true,
    },
    limit: {
      type: Number,
      default: 12,
    },
    owner: {
      type: String,
      default: null,
    }
  },
  data() {
    return {
      posts: [],
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters({
      getOwner: 'user/owner',
    }),
  },
  async created(context) {
    // const loading = this.$buefy.loading.open({
    //   'is-full-page': false
    // })

    this.isLoading = true
    let tlHandler = db

    if( this.isTimeline ) {
      tlHandler = db.collection('timelines')
        .doc('public')
        .collection('posts')
    } else {
      tlHandler = db.collection('posts')
    }
    
    if( this.owner ) tlHandler = tlHandler.where('owner', '==', db.collection('users').doc(this.owner))

    tlHandler = tlHandler
      .limit(this.limit)
      .orderBy('createdAt', 'desc')

    await tlHandler.get()
      .then(qs => {
        qs.forEach(doc => {
          this.posts.push(normalize(doc.id, doc.data()))
        })
      })

    this.isLoading = false

  },
  methods: {
    getTitle( content ) {
      return getTitle( content )
    },
    getEditLink(id) {
      return '/home/post/edit?id=' + id
    }
  },

}

</script>

<style lang="scss">

.loading-overlay {
  position: relative;
  height: 400px;

  .loading-background {
    background-color: $white;
  }
}

</style>