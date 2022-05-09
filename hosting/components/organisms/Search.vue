<template>
  <ais-instant-search
    :search-client="searchClient"
    :class-names="containerClassNames"
    index-name="posts"
    :stalled-search-delay="800"
  >
    <NavHeader title="SEARCH" subtitle="検索" />
    <div class="input">
      <ais-search-box>
        <template v-slot="{ currentRefinement, refine }">
          <fa-icon icon="search" class="icon" />
          <input
            type="text"
            placeholder="検索ワードを入力する"
            :value="currentRefinement"
            @input="refine($event.currentTarget.value)"
          />
        </template>
      </ais-search-box>
    </div>
    <ais-hits :class-names="resultClassNames">
      <nuxt-link slot="item" slot-scope="{ item }" :to="permalink(item)">
        <h2 class="title">{{ item.title }}</h2>
        <div class="content" v-html="summary(item.content)" />
        <p class="date">{{ formatDate(item.publishedAt) }}</p>
      </nuxt-link>
    </ais-hits>
  </ais-instant-search>
</template>
<script lang="ts">
import Vue from 'vue'
import InstantSearch from 'vue-instantsearch'
import algoliasearch, { SearchClient } from 'algoliasearch/lite'
import dayjs from 'dayjs'
import { getSummary } from '~/plugins/typography'

const { appId, apiKey } = process.env.ALGOLIA_CONFIG as any

Vue.use(InstantSearch)

type DataType = {
  searchClient: SearchClient
}

export default Vue.extend({
  data(): DataType {
    const algoliaClient = algoliasearch(appId, apiKey)

    return {
      searchClient: {
        ...algoliaClient,
        search(requests: any) {
          if (requests.every(({ params }: any) => !params.query)) {
            return Promise.resolve({
              results: requests.map(() => ({
                hits: [],
                nbHits: 0,
                nbPages: 0,
                page: 0,
                processingTimeMS: 0,
              })),
            })
          }
          return algoliaClient.search(requests)
        },
      },
    }
  },
  computed: {
    containerClassNames() {
      return {
        'ais-InstantSearch': 'search',
      }
    },
    resultClassNames() {
      return {
        'ais-Hits': 'result',
        'ais-Hits-list': 'items',
        'ais-Hits-item': 'item',
      }
    },
  },
  methods: {
    permalink(item: any): string {
      return `/post/${item.objectID}`
    },
    summary(content: string): string {
      return getSummary(content, 300)
    },
    formatDate(time: number): string {
      return dayjs(time * 1000).format('YYYY-MM-DD HH:mm')
    },
  },
})
</script>
<style lang="scss" scoped>
.search {
  // background-color: $black;
  height: 100%;

  .input {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid $black;
    padding: 22px 18px;
    font-size: 2.8rem;
    font-weight: 800;
    line-height: 1;
    > .icon {
      margin-right: 14px;
      font-size: 2.2rem;
    }
    > input {
      border: none;
      width: 100%;
    }
  }

  .result {
    /deep/ .items {
      & > .item {
        .title {
          font-size: 1.4rem;
          font-weight: 800;
          margin-bottom: 5px;
        }
        .content {
          font-size: 0.8rem;
          opacity: 0.9;
          margin-bottom: 12px;
        }
        .date {
          font-size: 0.8rem;
        }
        & > a {
          display: block;
          padding: $gap / 2;
          border-bottom: 1px solid $black;
          cursor: pointer;
          &:hover {
            background-color: $black;
            color: $yellow;
          }
        }
      }
    }
  }
}
</style>