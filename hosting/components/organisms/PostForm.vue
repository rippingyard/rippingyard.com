<template>
  <section class="block container">
    <div class="item bg-dotted">
      <div class="inner">
        <ItemForm :item="item" @update-item="updateItem" />
      </div>
    </div>
    <Wysiwyg v-model="content" />
    <div class="console">
      <div class="buttons">
        <button type="is-primary" class="button" @click="confirm">
          設定を確認して公開する
        </button>
        <button type="is-text" class="button no-border" @click="showPreview">
          プレビュー
        </button>
      </div>
    </div>
    <Modal v-if="isPreviewing" :on-close="closePreview">
      <div class="preview">
        <div v-if="item" class="parent">
          <ItemCard :item="item" />
        </div>
        <Content v-html="filteredContent" />
      </div>
    </Modal>
    <Modal v-if="isSetting" :on-close="closeSetting">
      <div class="row">
        <div>
          この記事は、<strong>{{
            isPublic ? '全世界に公開中' : '本人限定ノート'
          }}</strong>
          です
        </div>
        <button
          type="is-primary"
          class="button no-border"
          @click="togglePublic"
        >
          {{ isPublic ? '非公開にする' : '全世界に公開する' }}
        </button>
      </div>
      <div class="row">
        <EntityForm
          :default-entities="entities"
          @updateEntities="updateEntities"
        />
      </div>
      <div class="row">
        <button
          class="button"
          :class="{ 'is-disabled': isSaving }"
          @click="submit"
        >
          {{
            status !== 'draft'
              ? submitLabel
              : isPublic
              ? '公開する'
              : '自分のノートとして保存する'
          }}
        </button>
        <button
          class="button no-border"
          :class="{ 'is-disabled': isSaving }"
          @click="draft"
        >
          {{ draftLabel }}
        </button>
      </div>
    </Modal>
  </section>
</template>
<script>
import { isEmpty } from 'lodash'
import { mapActions } from 'vuex'
import { schemaPost } from '~/plugins/validators/post'
import { filterContent } from '~/services/post'
import { encodeEntity } from '~/services/entity'

export default {
  props: {
    post: {
      type: Object,
      default: () => {},
    },
    submitLabel: {
      type: String,
      default: '新規投稿',
    },
  },
  data() {
    return {
      content: '<h1>記事タイトル</h1><p></p>',
      entities: [],
      item: null,
      isPublic: true,
      isPreviewing: false,
      isSetting: false,
      isSaving: false,
      type: 'article',
      status: 'published',
    }
  },
  computed: {
    filteredContent() {
      return filterContent(this.content)
    },
    draftLabel() {
      return this.status === 'draft' ? '下書き保存' : '下書きに戻す'
    },
  },
  async mounted() {
    if (!this.$isAuthenticated(this.$store)) {
      this.$router.push('/')
    }
    if (this.post) {
      this.content = this.post.content
      this.isPublic = !!this.post.isPublic
      this.entities = this.post.entities || []
      this.type = this.post.type || 'article'
      this.status = this.post.status
      if (this.post.parent) {
        const parent = await this.post.parent.get()
        if (parent.exists) this.updateItem(parent.data())
      }
    }
  },
  methods: {
    ...mapActions({
      savePost: 'post/save',
      saveItem: 'item/save',
      saveEntity: 'entity/save',
      saveActivity: 'activity/save',
    }),
    togglePublic() {
      this.isPublic = !this.isPublic
    },
    showPreview() {
      this.isPreviewing = true
    },
    closePreview() {
      this.isPreviewing = false
    },
    showSetting() {
      this.isSetting = true
    },
    closeSetting() {
      this.isSetting = false
    },
    confirm() {
      this.showSetting()
    },
    updateEntities(val) {
      this.entities = val
    },
    updateItem(val) {
      console.log('updated!', val)
      this.item = !val ? null : val
    },
    async save() {
      let status = 'failed'
      if (this.isSaving) return

      const params = {
        content: this.content,
        type: this.type,
        entities: this.entities,
        status: this.status,
        isPublic: this.isPublic,
      }

      try {
        this.isSaving = true

        if (this.post?.id) params.id = this.post.id
        console.log('val', schemaPost.validate(params))

        const { error } = schemaPost.validate(params)
        if (!isEmpty(error)) {
          console.log('Error', error.details)
          return this.snackAlert('投稿に失敗しました')
        }

        if (this.item) {
          console.log('this.item', this.item)
          const q = await this.$fire.firestore
            .collection('items')
            .where('isDeleted', '==', false)
            .where('path', '==', this.item.path)
            .where('type', '==', this.item.type)
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

        if (this.entities) {
          const existanceChecks = this.entities.map(async e => {
            console.log('Entity', e)
            return await this.$fire.firestore
              .doc(`entities/${encodeEntity(e)}`)
              .get()
          })
          const existances = await Promise.all(existanceChecks)

          const promises = existances
            .filter(e => !e.exists)
            .map(async e => {
              return await this.saveEntity({
                id: e.id,
              })
            })

          if (promises) await Promise.all(promises)
        }

        const post = this.post ? Object.assign(this.post, params) : params

        await this.savePost(post)
        status = 'succeeded'
      } catch (e) {
        console.warn(e)
      }

      await this.saveActivity({
        type: this.post ? 'post:update' : 'post:create',
        status,
        payload: params,
      })

      this.isSaving = false

      if (status === 'succeeded') {
        this.$router.push('/home/posts')
      }
    },
    async submit() {
      this.status = 'published'
      await this.save()
    },
    async draft() {
      this.status = 'draft'
      await this.save()
    },
  },
}
</script>
<style lang="scss" scoped>
.preview {
  padding: 0 $gap * 2 $gap;
  > .parent {
    margin-top: $gap;
    margin-bottom: $gap;
  }
}

.item {
  padding: 20px;
  border: 1px solid $black;
  margin-bottom: $gap;
  > .inner {
    background: $white;
    border: 1px solid $black;
  }
}

.row {
  padding: $gap;
  border-bottom: 1px solid $gray-black;
  &:last-child {
    // padding-bottom: $gap * 2;
    border-bottom: 0;
  }
}
</style>
