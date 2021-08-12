<template>
  <div class="block container">
    <p>SEARCH</p>
      <ais-instant-search
        :search-client="searchClient"
        index-name="posts"
      >
      <ais-search-box />
      <ais-hits>
        <div slot="item" slot-scope="{ item }">
          <nuxt-link :to="permalink(item)">
            <h2>{{ item.title }}</h2>
          </nuxt-link>
        </div>
      </ais-hits>
    </ais-instant-search>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import InstantSearch from 'vue-instantsearch'

import algoliasearch from 'algoliasearch/lite'

Vue.use(InstantSearch)

const { appId, apiKey } = process.env.ALGOLIA_CONFIG as any

export default Vue.extend({
  data() {
    return {
      posts: [],
      searchClient: algoliasearch(appId, apiKey),
    }
  },
  methods: {
    permalink(item: any): string {
      return `/post/${item.objectID}`
    }
  }
})
</script>
