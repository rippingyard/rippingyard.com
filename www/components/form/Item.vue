<template>
  <section class="inner" :class="[color]">
    <div v-show="status !== 'shown'">
      <p class="label">何について書きますか？</p>
      <input v-model="itemName" class="input" @keypress.enter="fetchItem" @keyup.down="nextItem" @keyup.up="prevItem" />
    </div>
    <div v-if="status === 'loading'" class="loading">
      <IconLoading color="yellow" />
    </div>
    <div v-else-if="status !== 'hidden'" class="embed">
      <button class="close" @click="resetItem"></button>
      <!-- <ItemCard :item="item" :no-border="true" :editable="true" /> -->
    </div>
    <div v-if="isSuggesting" class="suggest">
      <ul>
        <li v-for="(suggestedItem, i) of suggestedItems" :key="suggestedItem.id" :class="{
          'is-selected': item && suggestedItem.id === item.id,
          'is-pointed': i === suggestPointer,
        }" @click="selectItem(suggestedItem)">
          {{ name(suggestedItem) }}
        </li>
      </ul>
      <div class="overflow" @click="clearSuggestItems()" />
    </div>
  </section>
</template>
<script lang="ts" setup>
import { Embed, EmbedStatus } from '~/types/embed'
import { useItems } from '~~/composables/fetch/useItems';
import { useApi } from '~~/composables/firebase/useApi';
import { Item } from '~~/schemas/item';
import { isUrl } from '~~/utils';

// type DataType = {
//   embed: Embed
//   hideSuggesting: boolean
//   timer: NodeJS.Timeout | null
// }

type Color = 'white' | 'yellow';

type Props = {
  color?: Color;
}
const props = defineProps<Props>()

const color = computed<Color>(() => props.color || 'white');

const itemName = ref('');
const status = ref<EmbedStatus>('hidden');
const suggestPointer = ref<number | null>(null);
const embed = ref<Embed>();
const hideSuggesting = ref(false);

const item = ref<Item>();
const itemsRef = useItems({
  limit: 1000
});
const items = computed<Item[]>(() => itemsRef.data.value || []);

// data(): DataType {
//   return {
//     timer: null,
//   }
// },
const suggestedItems = computed<Item[]>(() => {
  if (!itemName.value) return [];
  const keys: string[] = Object.keys(items.value);
  console.log('suggestedKeys', keys);
  // const matchedItems: Item[] = [];
  // for (const key of keys) {
  //   if (
  //     items.value[key]?.path &&
  //     (this.items()[key].path.match(new RegExp(this.itemName)) ||
  //       this.items()[key].name.ja.match(new RegExp(this.itemName)))
  //   ) {
  //     items.push(this.items()[key])
  //   }
  // }
  // console.log('suggestedItems', items)
  // return items.slice(0, 5)
  return [];
});
const isSuggesting = computed(() => {
  return !hideSuggesting.value && suggestedItems.value.length > 0;
});
//   },
//   watch: {
//     itemName(): void {
//       this.resetItem()
//     },
//     item(val: Item | null): void {
//       // console.log('item updated', val)
//       this.status = 'shown'
//       if (!val) {
//         this.itemName = ''
//         this.status = 'hidden'
//         this.resetItem()
//       }
//     },
//   },
//   async created() {
//     const q = (this as any).$fire.firestore
//       .collection('items')
//       .where('isDeleted', '==', false)
//       .where('status', '==', 'published')
//       .limit(1000)
//       .orderBy('createdAt', 'desc')
//     const qs = await q.get()
//     for (const doc of qs.docs) {
//       const item: Item = doc.data()
//       this.$store.commit('item/setItem', { id: item.id, item })
//     }
//     console.log('items', this.items())
//   },
const resetItem = (): void => {
  embed.value = {};
  status.value = 'hidden';
  hideSuggesting.value = false;
  // this.$emit('update-item')
};
const nextItem = (): void => {
  if (suggestPointer.value === null) suggestPointer.value = -1;
  suggestPointer.value = suggestedItems.value.length > suggestPointer.value + 1
    ? suggestPointer.value + 1
    : items.value.length;
};
const prevItem = (): void => {
  if (suggestPointer.value === null) return;
  suggestPointer.value = suggestPointer.value > 0 ? suggestPointer.value - 1 : 0
};
const fetchItem = async (): Promise<void> => {
  console.log('startFetch', itemName.value);
  status.value = 'loading';

  if (
    suggestPointer.value !== null &&
    suggestedItems.value[suggestPointer.value]
  ) {
    console.log('test');
    //   this.selectItem(this.suggestedItems[this.suggestPointer])
  } else {
    const payload: Partial<Item> = {
      name: {
        ja: itemName.value,
      },
      type: 'unknown',
      path: itemName.value,
      entities: [],
    }
    if (isUrl(itemName.value)) {
      embed.value = {};
      await fetchUrl(itemName.value);

      payload.type = 'bookmark';
      payload.name = {
        ja: embed.value?.title || itemName.value,
      };
      payload.thumbnailImage = embed.value.image || '';
      payload.images = embed.value.image ? [embed.value.image] : [];
      payload.metadata = embed.value.url ? embed.value : {}
    }
    status.value = 'shown';
    //   this.$emit('update-item', payload)
  }
};
const fetchUrl = async (url: string): Promise<void> => {
  try {
    const { api } = useApi('apiFetchUrl');
    const res = await api({
      url,
    });
    embed.value = { ...(res.data as Embed), status: 'shown' };
  } catch (e: any) {
    status.value = 'hidden';
    embed.value = {
      error: e.message,
    }
  }
};
const selectItem = (item: Item): void => {
  // this.selectedItemId = item.id
  status.value = 'shown';
  hideSuggesting.value = true;
  // this.$emit('update-item', item)
};

const clearSuggestItems = (): void => {
  suggestPointer.value = null;
  hideSuggesting.value = true;
};

const name = (item: Item): string => {
  // console.log('name', item)
  if (!item) return '';
  if (item.name?.ja) return item.name.ja;
  if (item.path) return item.path;
  return '';
};
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
    line-height: 1.9;
    padding: 3px 8px;
    border-bottom: 1px solid $black;
    border-right: 1px solid $black;
  }

  .input {
    font-size: 1.1rem;
    font-weight: 800;
    width: 100%;
    padding: 3px 13px 13px;
    outline: none;
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

    >ul {
      >li {
        border: 1px solid $black;
        border-top: 0;
        padding: 8px $gap * 0.25;
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
      >ul {
        >li {
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