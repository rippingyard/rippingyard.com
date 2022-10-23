<template>
  <main class="frame">
    <section class="block container">
      <Header />
      <ItemList :items="items" />
      <div class="console">
        <button class="button expanded centered" @click="loadMore()">
          もっと読む
        </button>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Timestamp } from 'firebase/firestore'
import { normalize } from '~/services/item'
import { Context } from '~/types/context'
// import { Post } from '~/types/post'
import { Item } from '~/types/item'
import { getI18nName } from '~/plugins/typography'

type DataType = {
  items: Partial<Item>[]
  lastDate: any
}

const limit = 100

export default {
  async asyncData({ $fire, store }: Context): Promise<DataType> {
    const items: Partial<Item>[] = []
    let lastDate: any
    const qs = await $fire.firestore
      .collection('items')
      // .where('isDeleted', '==', false)
      .limit(limit)
      .orderBy('createdAt', 'desc')
      .get()

    for (const doc of qs.docs) {
      const item = doc.data()
      lastDate = item.publishedAt
      items.push(await normalize(doc.id, item, store))
    }

    return {
      items,
      lastDate,
    }
  },
  data(): DataType {
    return {
      items: [],
      lastDate: null,
    }
  },
  methods: {
    title(item: Item): string {
      if (!item.name) return ''
      return getI18nName(item.name)
    },
    async loadMore(): Promise<void> {
      await this.getPosts(
        (this as any).$data.items[(this as any).items.length - 1].createdAt
      )
    },
    async getPosts(startAt: string): Promise<void> {
      let q = (this as any).$fire.firestore
        .collection('items')
        .where('isDeleted', '==', false)
        // .where('isPublic', '==', true)
        // .where('status', '==', 'published')
        // .where('type', 'in', ['article', 'note'])
        .limit(limit)
        .orderBy('createdAt', 'desc')

      if (startAt) {
        q = q.startAfter(Timestamp.fromDate(new Date(startAt)))
      }

      const qs = await q.get()

      for (const doc of qs.docs) {
        const item: any = doc.data()
        ;(this as any).$data.lastDate = item.createdAt
        ;(this as any).items.push(
          await normalize(doc.id, item, (this as any).$store)
        )
      }
    },
  },
  head: (): any => {
    return {
      title: 'Items',
    }
  },
}
</script>
<style lang="scss" scoped>
.console {
  padding: $gap 0;
}
</style>
