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
        <template v-slot="{ refine }">
          <fa-icon icon="search" class="icon" />
          <input
            v-model="query"
            type="text"
            placeholder="検索ワードを入力する"
            @keydown.enter="search(refine)"
            @compositionstart="startComposing"
            @compositionend="stopComposing"
          />
          <button
            v-if="query.length > 0"
            class="submit"
            @click="search(refine)"
          >
            SEARCH
          </button>
        </template>
      </ais-search-box>
    </div>
    <ais-hits :class-names="resultClassNames" :transform-items="filterItems">
      <nuxt-link slot="item" slot-scope="{ item }" :to="permalink(item)">
        <h2 class="title">{{ item.title }}</h2>
        <div class="content" v-html="summary(item.content)" />
        <p class="date">{{ formatDate(item.publishedAt) }}</p>
      </nuxt-link>
    </ais-hits>
    <div v-if="isEmpty" class="empty">
      <p class="result">検索結果はありません</p>
    </div>
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
  query: string
  searchClient: SearchClient
  isEmpty: boolean
  isComposing: boolean
}

export default Vue.extend({
  data(): DataType {
    const algoliaClient = algoliasearch(appId, apiKey)
    return {
      query: '',
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
      isEmpty: false,
      isComposing: false,
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
    search(refine: (query: string) => {}): void {
      if (!this.isComposing) refine(this.query)
    },
    filterItems(items: any[]) {
      this.isEmpty = this.query !== '' && items.length === 0
      return items
    },
    permalink(item: any): string {
      return `/post/${item.objectID}`
    },
    summary(content: string): string {
      return getSummary(content, 300)
    },
    formatDate(time: number): string {
      return dayjs(time * 1000).format('YYYY-MM-DD HH:mm')
    },
    startComposing(): void {
      this.isComposing = true
    },
    stopComposing(): void {
      this.isComposing = false
    },
  },
})
</script>
<style lang="scss" scoped>
.search {
  // background-color: $black;
  height: 100%;

  .input {
    .ais-SearchBox {
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
      > .submit {
        padding: 8px 14px;
        background-color: $black;
        color: $yellow;
        border-radius: 100px;
        font-size: 1.4rem;
        &:hover {
          background-color: $gray-black;
        }
      }
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

  .empty {
    padding: 20px;
    .result {
      font-size: 1.2rem;
    }
  }

  @include until-desktop {
    .input {
      .ais-SearchBox {
        font-size: 1.4rem;
        > .icon {
          font-size: 2rem;
        }
        > .submit {
          font-size: 1.1rem;
          padding: 5px 10px;
        }
      }
    }
  }
}
</style>