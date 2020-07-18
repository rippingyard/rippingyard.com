<template>
  <section>
    
    <b-loading :active.sync="isLoading" :is-full-page="false"></b-loading>
    <b-table
      ref="table"
      :data="posts"
      :default-sort="['createdAt', 'desc']"
      :striped="true"
      per-page="999"
    >

      <template slot-scope="props">

        <b-table-column field="content" label="タイトル">
          <strong><nuxt-link :to="props.row.permalink" target="_blank">{{ getTitle(props.row.content) }}</nuxt-link></strong>
        </b-table-column>

        <b-table-column field="content" label="公開日">
          <small>{{ props.row.publishedAt }}</small>
        </b-table-column>

        <b-table-column field="content" label="-">
          <b-button
            v-if="isActive( props.row.id )"
            :to="getEditLink(props.row.id)"
            size="is-small"
            tag="nuxt-link">
            編集
          </b-button>
          <b-button
            v-if="isActive( props.row.id )"
            :href="props.row.permalink"
            size="is-small"
            tag="a"
            target="_blank">
            表示
          </b-button>
          <b-button
            v-if="isActive( props.row.id )"
            @click="deleteP(props.row.id)"
            size="is-small"
            tag="button">
            削除
          </b-button>
        </b-table-column>
      </template>

    </b-table>
        
  </section>
</template>

<script>

import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
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
    },
  },
  data() {
    return {
      posts: [],
      deletedItems: [],
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
    ...mapActions({
      deletePost: 'post/delete'
    }),
    getTitle( content ) {
      return getTitle( content )
    },
    getEditLink( id ) {
      return '/home/post/edit?id=' + id
    },
    isActive( id ) {
      return !_.find(this.deletedItems, o => { return o.id === id })
      // return this.deletedItems[id] !== 'deleted'
    },
    deleteP( id ) {
      console.log('postId:', id)

      this.deletedItems.push({
        id: id,
        status: 'deleted'
      })

      return this.deletePost({
        id,
        notification: this.$buefy.notification
      })

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