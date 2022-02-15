<template>
  <div v-show="isAuthenticated" class="form">
    <client-only>
      <div class="item bg-dotted">
        <div class="inner">
          <ItemForm :item="item" color="yellow" @update-item="updateItem" />
        </div>
      </div>
      <div class="inner">
        <TextArea v-model="content" />
      </div>
      <div class="footer bg-dotted">
        <div class="footer-main">
          <!-- <div class="status"><span>{{ statusLabel }}</span></div> -->
          <button
            :class="{ 'is-disabled': isOver || isEmpty }"
            class="button"
            @click="submit()"
          >
            投稿する
          </button>
        </div>
        <div class="footer-side">
          <div :class="{ 'is-over': isOver }" class="counter">
            {{ contentLength }} / {{ limit }}
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { getLength } from '~/plugins/typography'
import { Post } from '~/types/post'
import { Item } from '~/types/item'
import { permalink } from '~/services/post'

type DataType = {
  content: string
  item: Item | null
  entities: string[]
  resetCount: number
  status: 'published' | 'draft'
  isPublic: boolean
  isOpen: boolean
  isSaving: boolean
  cleaningItem: number
}

export default Vue.extend({
  props: {
    limit: {
      type: Number,
      default: 800,
    },
  },
  data(): DataType {
    return {
      content: '',
      entities: [],
      resetCount: 0,
      item: null,
      status: 'published',
      isPublic: true,
      isOpen: false,
      isSaving: false,
      cleaningItem: new Date().getTime(),
    }
  },
  computed: {
    isAuthenticated(): boolean {
      return this.$isAuthenticated(this.$store)
    },
    contentLength(): number {
      return getLength(this.content)
    },
    isOver(): boolean {
      return this.contentLength > this.limit
    },
    isEmpty(): boolean {
      return this.contentLength === 0
    },
  },
  methods: {
    ...mapActions({
      saveItem: 'item/save',
      savePost: 'post/save',
      saveEntity: 'entity/save',
      saveActivity: 'activity/save',
    }),
    toggleForm(): void {
      this.isOpen = !this.isOpen
    },
    closeForm(): void {
      this.isOpen = false
    },
    clearForm(): void {
      this.content = ''
      this.entities = []
      this.item = null
    },
    updateItem(val: any): void {
      console.log('updateItem', val)
      this.item = !val ? null : val
    },
    async submit(): Promise<void> {
      let status = 'failed'
      if (this.isSaving) return

      const params: Partial<Post> = {
        content: this.content,
        type: 'note',
        entities: this.entities,
        status: this.status,
        isPublic: this.isPublic,
      }

      try {
        this.isSaving = true

        if (this.item) {
          const q = await (this as any).$fire.firestore
            .collection('items')
            .where('isDeleted', '==', false)
            .where('path', '==', this.item.path)
            .where('type', '==', this.item.type)
            // .where('status', '==', 'published')
            .limit(1)
            .orderBy('createdAt', 'desc')
            .get()

          if (!q.empty) {
            params.parent = q.docs[0].ref
          } else {
            const item = await this.saveItem(this.item)
            params.parent = item
          }
          console.log('parent', params.parent)
        }

        //   if (this.post?.id) params.id = this.post.id
        //   console.log('val', schemaPost.validate(params))

        //   const { error } = schemaPost.validate(params)
        //   if (!isEmpty(error)) {
        //     console.log('Error', error.details)
        //     return this.snackAlert('投稿に失敗しました')
        //   }

        //   if (this.entities) {
        //     const existanceChecks = this.entities.map(async e => {
        //       console.log('Entity', e)
        //       return await this.$fire.firestore.doc(`entities/${encodeEntity(e)}`).get()
        //     })
        //     const existances = await Promise.all(existanceChecks)

        //     const promises = existances.filter(e => !e.exists).map(async e => {
        //       return await this.saveEntity({
        //         id: e.id,
        //       })
        //     })

        //     if (promises) await Promise.all(promises)
        //   }

        const newPost = await this.savePost(params)
        status = 'succeeded'

        console.log('NEWPOST!!!!', newPost)

        this.clearForm()
        this.$router.push(permalink(newPost.id))
      } catch (e) {
        console.error(e)
      }

      await this.saveActivity({
        type: 'item:create',
        status,
        payload: params,
      })

      this.isSaving = false
    },
  },
})
</script>
<style lang="scss" scoped>
.form {
  width: 100%;
  z-index: 80000;
  border-radius: 10px;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  .item {
    padding: 20px;
    border-bottom: 1px solid $black;
    flex-shrink: 0;
    > .inner {
      background: $yellow;
      border: 1px solid $black;
    }
  }

  > .inner {
    padding: 20px;
    flex-grow: 1;
    overflow-y: auto;
  }

  .footer {
    display: flex;
    position: relative;
    width: 100%;
    padding: 20px;
    border-top: 1px solid $black;
    flex-shrink: 0;
    align-items: center;

    @include mobile {
      width: 100%;
      flex-direction: column;
    }

    .footer-main {
      display: flex;
      align-items: center;
      text-align: left;
      flex-grow: 1;
      @include mobile {
        display: inline-block;
        position: absolute;
        top: 10px;
        left: 0;
      }
    }
    .footer-side {
      display: flex;
      align-items: center;
      text-align: right;
      flex-grow: 1;
      @include mobile {
        width: 100%;
        text-align: right;
      }
    }
    .status {
      display: inline-block;
      padding: 10px 0 0 6px;
      > span {
        font-weight: 800;
        border-bottom: 2px solid $black;
      }
      @include mobile {
        padding-bottom: 10px;
      }
    }
    .counter {
      display: inline-block;
      margin-right: 10px;
      flex-grow: 1;
      &.is-over {
        color: $red;
      }
    }
    .button {
      display: inline-block;
    }
  }
}
</style>
