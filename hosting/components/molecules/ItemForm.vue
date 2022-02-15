<template>
  <section class="inner" :class="[color]">
    <div v-show="status !== 'shown'">
      <p class="label">何について書きますか？</p>
      <input
        v-model="itemName"
        class="input"
        @keypress.enter="fetchItem"
        @keyup.down="nextItem"
        @keyup.up="prevItem"
      />
    </div>
    <div v-if="status === 'loading'" class="loading">
      <LoadingIcon color="yellow" />
    </div>
    <div v-else-if="status !== 'hidden'" class="embed">
      <button class="close" @click="resetItem"></button>
      <ItemCard :item="item" :no-border="true" :editable="true" />
    </div>
    <div v-if="isSuggesting" class="suggest">
      <ul>
        <li
          v-for="(suggestedItem, i) of suggestedItems"
          :key="suggestedItem.id"
          :class="{
            'is-selected': item && suggestedItem.id === item.id,
            'is-pointed': i === suggestPointer,
          }"
          @click="selectItem(suggestedItem)"
        >
          {{ name(suggestedItem) }}
        </li>
      </ul>
      <div class="overflow" @click="clearSuggestItems()" />
    </div>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Embed } from '~/types/embed'
import { isUrl } from '~/plugins/typography'
import { Item } from '~/types/item'

type DataType = {
  itemName: string
  embed: Embed
  status: 'hidden' | 'loading' | 'shown'
  // selectedItemId: string | null
  suggestPointer: null | number
  hideSuggesting: boolean
  timer: NodeJS.Timeout | null
}

export default Vue.extend({
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    color: {
      type: String,
      default: 'white',
    },
  },
  data(): DataType {
    return {
      itemName: '',
      embed: {},
      status: 'hidden',
      // selectedItemId: null,
      suggestPointer: null,
      hideSuggesting: false,
      timer: null,
    }
  },
  computed: {
    ...mapGetters({
      items: 'item/all',
    }),
    suggestedItems(): Item[] {
      if (!this.itemName) return []
      const keys: string[] = Object.keys(this.items())
      const items: Item[] = []
      for (const key of keys) {
        if (
          this.items()[key]?.path &&
          (this.items()[key].path.match(new RegExp(this.itemName)) ||
            this.items()[key].name.ja.match(new RegExp(this.itemName)))
        ) {
          items.push(this.items()[key])
        }
      }
      console.log('suggestedItems', items)
      return items.slice(0, 5)
    },
    isSuggesting(): boolean {
      return !this.hideSuggesting && this.suggestedItems.length > 0
    },
  },
  watch: {
    itemName(): void {
      this.resetItem()
    },
    item(val: Item | null): void {
      console.log('item updated', val)
      this.status = 'shown'
      if (!val) {
        this.itemName = ''
        this.status = 'hidden'
        this.resetItem()
      }
    },
  },
  async created() {
    const q = (this as any).$fire.firestore
      .collection('items')
      .where('isDeleted', '==', false)
      .where('status', '==', 'published')
      .limit(1000)
      .orderBy('createdAt', 'desc')
    const qs = await q.get()
    for (const doc of qs.docs) {
      const item: Item = doc.data()
      this.$store.commit('item/setItem', { id: item.id, item })
    }
    console.log('items', this.items())
  },
  methods: {
    resetItem(): void {
      this.embed = {}
      this.status = 'hidden'
      this.hideSuggesting = false
      this.$emit('update-item')
    },
    nextItem(): void {
      console.log('this.suggestPointer', this.suggestPointer)
      if (this.suggestPointer === null) this.suggestPointer = -1
      this.suggestPointer =
        this.suggestedItems.length > this.suggestPointer + 1
          ? this.suggestPointer + 1
          : this.items.length
    },
    prevItem(): void {
      if (this.suggestPointer === null) return
      this.suggestPointer =
        this.suggestPointer > 0 ? this.suggestPointer - 1 : 0
    },
    async fetchItem(): Promise<void> {
      console.log('startFetch', this.itemName)
      this.status = 'loading'

      if (
        this.suggestPointer !== null &&
        this.suggestedItems[this.suggestPointer]
      ) {
        this.selectItem(this.suggestedItems[this.suggestPointer])
      } else {
        const payload: Partial<Item> = {
          name: {
            ja: this.itemName,
          },
          type: 'unknown',
          path: this.itemName,
        }
        if (isUrl(this.itemName)) {
          this.embed = {}
          await this.fetchUrl(this.itemName)

          payload.type = 'bookmark'
          payload.name = {
            ja: this.embed.title || this.itemName,
          }
          payload.thumbnailImage = this.embed.image || ''
          payload.images = this.embed.image ? [this.embed.image] : []
          payload.metadata = this.embed.url ? this.embed : {}
        }
        this.status = 'shown'
        this.$emit('update-item', payload)
      }
    },
    async fetchUrl(url: string): Promise<void> {
      try {
        const api = (this as any).$fire.functions.httpsCallable('apiFetchUrl')
        const res = await api({
          url,
        })
        this.embed = { ...res.data, status: 'shown' }
      } catch (e) {
        this.status = 'hidden'
        this.embed = {
          error: (e as any).message,
        }
      }
    },
    selectItem(item: Item): void {
      // this.selectedItemId = item.id
      this.status = 'shown'
      this.hideSuggesting = true
      this.$emit('update-item', item)
    },
    clearSuggestItems(): void {
      this.hideSuggesting = true
    },
    name(item: Item): string {
      console.log('name', item)
      if (!item) return ''
      if (item.name?.ja) return item.name.ja
      if (item.path) return item.path
      return ''
    },
  },
})
</script>
<style lang="scss" scoped>
.inner {
  position: relative;
  z-index: 100;
  .label {
    display: inline-block;
    background-color: $white;
    color: $black;
    font-size: 0.8rem;
    padding: 3px 8px;
    border-bottom: 1px solid $black;
    border-right: 1px solid $black;
  }
  .input {
    font-size: 1.1rem;
    font-weight: 800;
    width: 100%;
    padding: 3px 13px 13px;
  }
  .embed {
    position: relative;
    border: 7px $black solid;
    overflow: hidden;
    .close {
      display: block;
      position: absolute;
      top: -7px;
      right: -7px;
      width: 24px;
      height: 26px;
      cursor: pointer;
      background-color: $black;

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2px;
        height: 12px;
        background: $white;
      }

      &::before {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &::after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
  }
  .suggest {
    position: absolute;
    z-index: 100;
    left: -1px;
    bottom: -301px;
    width: calc(100% + 2px);
    height: 300px;
    > ul {
      > li {
        border: 1px solid $black;
        border-top: 0;
        padding: 8px $gap / 4;
        background-color: $white;
        color: $black;
        cursor: pointer;
        &.is-selected {
          background-color: $black;
          color: $yellow;
        }
        &:hover,
        &.is-pointed {
          background-color: $gray;
        }
      }
    }
    .overflow {
      position: fixed;
      z-index: -1;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
  &.yellow {
    .label {
      background-color: $black;
      color: $yellow;
      border-bottom: 1px solid $black;
      border-right: 1px solid $black;
    }
    .embed {
      border: 7px $black solid;
      .close {
        background-color: $black;
        &::before,
        &::after {
          background: $yellow;
        }
      }
    }
    .suggest {
      > ul {
        > li {
          border: 1px solid $black;
          border-top: 0;
          background-color: $yellow;
          color: $black;
          &.is-selected {
            background-color: $black;
            color: $yellow;
          }
          &:hover,
          &.is-pointed {
            background-color: $gray;
          }
        }
      }
    }
  }
}
.loading {
  display: flex;
  padding: $gap 0;
  background-color: $black;
  align-items: center;
  justify-content: center;
}
</style>