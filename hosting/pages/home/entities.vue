<template>
  <section class="columns is-bordered">
    <div class="column c20">
      <ManageNav />
    </div>
    <div class="column c80">
      <EntityTable :data="posts">
        <template slot-scope="props">
          <TableColumn field="content" label="タイトル">
            <strong>
              <nuxt-link :to="props.row.permalink" target="_blank">
                {{ getTitle(props.row.content) }}
              </nuxt-link>
            </strong>
          </TableColumn>
          <TableColumn field="content" label="公開日">
            <small>{{ props.row.publishedAt }}</small>
          </TableColumn>
        </template>
      </EntityTable>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'
// import { DocumentData } from '@firebase/firestore-types'
import { normalize } from '~/services/post'

import { getTitle } from '~/plugins/typography'

export default {
  // layout: 'manage',
  middleware: ['auth'],
  async asyncData({ $fire, store }) {
    const posts = []

    const db = $fire.firestore.collection('posts')

    await db
      .limit(1000)
      .orderBy('createdAt', 'desc')
      .get()
      .then(qs => {
        qs.forEach(doc => {
          const post = doc.data()
          if (post.isDeleted === true) return
          return posts.push(normalize(doc.id, post, store))
        })
      })

    return {
      posts,
    }
  },
  data() {
    return {
      posts: [],
    }
  },
  methods: {
    ...mapActions({
      deletePost: 'post/delete',
    }),
    getTitle(content) {
      return getTitle(content)
    },
    getEditLink(id) {
      return `/home/post/edit/${id}`
    },
    isActive(id) {
      return !_.find(this.deletedItems, o => {
        return o.id === id
      })
    },
    deleteP(id) {
      this.deletedItems.push({
        id,
        status: 'deleted',
      })

      return this.deletePost({
        id,
        notification: this.$buefy.notification,
      })
    },
  },
}
</script>
