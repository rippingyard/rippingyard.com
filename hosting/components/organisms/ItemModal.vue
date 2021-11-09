<template>
  <div>
    <client-only>
      <nav v-if="isAuthenticated" class="nav">
        <CommentTrigger :click="toggleForm" />
        <div class="form" :class="{ open: isOpen }">
          <div class="inner">
            <div class="header">
              <input v-model="itemName" />
            </div>
            <EmbedCard v-if="embed" :content="embed" />
            <TextArea v-model="content" />
          </div>
          <div class="footer">
            <div class="footer-main">
              <!-- <div class="status"><span>{{ statusLabel }}</span></div> -->
            </div>
            <div class="footer-side">
              <div :class="{ 'is-over': isOver }" class="counter">
                {{ contentLength }} / {{ limit }}
              </div>
              <button
                :class="{ 'is-disabled': isOver || isEmpty }"
                class="button"
                @click="submit()"
              >
                投稿する
              </button>
            </div>
          </div>
        </div>
      </nav>
    </client-only>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { getLength, isUrl } from '~/plugins/typography'
import { Post } from '~/types/post'
import { Embed } from '~/types/embed'
import { Item } from '~/types/item'

type DataType = {
  content: string
  itemName: string
  entities: string[]
  embed: Embed
  resetCount: number
  status: 'published' | 'draft'
  isPublic: boolean
  isOpen: boolean
  isSaving: boolean
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
      itemName: '',
      entities: [],
      embed: {
        isLoading: false,
      },
      resetCount: 0,
      status: 'published',
      isPublic: true,
      isOpen: false,
      isSaving: false,
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
  watch: {
    async itemName(val) {
      this.embed = {
        isLoading: false,
      }
      if (isUrl(val)) {
        this.embed = {
          isLoading: true,
        }
        await this.fetchUrl(val)
      }
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
    async fetchUrl(url: string): Promise<void> {
      try {
        const api = (this as any).$fire.functions.httpsCallable('apiFetchUrl')
        const res = await api({
          url,
        })
        this.embed = { ...res.data, isLoading: false }
      } catch (e) {
        this.embed = {
          error: (e as any).message,
          isLoading: false,
        }
      }
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

        let payload: Partial<Item> = {}
        if (!isUrl(this.itemName)) {
          payload = {
            name: {
              ja: this.itemName,
            },
            type: 'unknown',
          }
        } else {
          if (this.embed.isLoading && isUrl(this.itemName)) {
            await this.fetchUrl(this.itemName)
          }
          payload = {
            name: {
              ja: this.embed.title || this.itemName,
            },
            url: this.itemName,
            thumbnailImage: this.embed.image || '',
            images: this.embed.image ? [this.embed.image] : [],
            metadata: this.embed.url ? this.embed : {},
            type: 'bookmark',
          }
        }

        const item = await this.saveItem(payload)

        console.log('Item', item)

        params.items = [item]

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

        await this.savePost(params)
        status = 'succeeded'
      } catch (e) {
        console.warn(e)
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
  position: fixed;
  width: 440px;
  // height: 300px;
  right: 15px;
  bottom: 60px;
  z-index: 80000;
  background-color: $gray;
  border-radius: 10px;
  display: none;
  &.open {
    display: block;
  }
  .inner {
    padding: 20px;
  }

  .footer {
    display: flex;
    position: relative;
    justify-content: space-between;
    // border-top: 1px solid $gray-black;
    padding: 10px;

    @include mobile {
      width: 100%;
      flex-direction: column;
    }

    .footer-main {
      text-align: left;
      width: 50%;
      @include mobile {
        display: inline-block;
        position: absolute;
        top: 10px;
        left: 0;
      }
    }
    .footer-side {
      text-align: right;
      width: 50%;
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
