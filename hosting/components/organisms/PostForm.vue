<template>
  <section class="block container">
    <Wysiwyg :post="post" @update="updateContent" />
    <div class="console">
      <div class="buttons">
        <button type="is-primary" class="button" @click="confirm">設定を確認して公開する</button>
        <button type="is-text" class="button no-border" @click="showPreview">プレビュー</button>
      </div>
    </div>
    <Modal v-if="isPreviewing" :on-close="closePreview">
      <div class="preview">
        <Content v-html="filteredContent" />
      </div>
    </Modal>
    <Modal v-if="isSetting" :on-close="closeSetting">
      <div class="row">
        <div>
          この記事は、<strong>{{ isPublic ? '全世界に公開中' : '本人限定ノート' }}</strong>です
        </div>
        <button type="is-primary" class="button no-border" @click="togglePublic">
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
          :class="{'is-disabled': isSaving}"
          @click="submit"
        >
          {{ status !== 'draft' ? submitLabel : isPublic ? '公開する' : '自分のノートとして保存する' }}
        </button>
        <button
          class="button no-border"
          :class="{'is-disabled': isSaving}"
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
      content: '',
      entities: [],
      isPublic: true,
      isPreviewing: false,
      isSetting: false,
      isSaving: false,
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
  mounted() {
    console.log('Mounted', this.post)
    if (!this.$isAuthenticated(this.$store)) {
      this.$router.push('/')
    }
    if (this.post) {
      this.content = this.post.content || ''
      this.isPublic = !!this.post.isPublic
      this.entities = this.post.entities || []
      this.status = this.post.status
    }
    console.log('isPublic', this.isPublic)
  },
  methods: {
    ...mapActions({
      savePost: 'post/save',
      saveEntity: 'entity/save',
    }),
    updateContent(content) {
      this.content = content
    },
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
    async save() {
      if (this.isSaving) return
      try {
        this.isSaving = true

        const params = {
          content: this.content,
          type: 'article',
          entities: this.entities,
          status: this.status,
          isPublic: this.isPublic,
        }
        if (this.post?.id) params.id = this.post.id
        console.log('val', schemaPost.validate(params))

        const { error } = schemaPost.validate(params)
        if (!isEmpty(error)) {
          console.log('Error', error.details)
          return this.snackAlert('投稿に失敗しました')
        }

        if (this.entities) {
          const existanceChecks = this.entities.map(async e => {
            console.log('Entity', e)
            return await this.$fire.firestore.doc(`entities/${encodeEntity(e)}`).get()
          })
          const existances = await Promise.all(existanceChecks)

          const promises = existances.filter(e => !e.exists).map(async e => {
            return await this.saveEntity({
              id: e.id,
            })
          })
          
          if (promises) await Promise.all(promises)
        }

        const post = this.post ? Object.assign(this.post, params) : params

        await this.savePost({
          post,
        })

        console.log('post', post)

        this.isSaving = false

        this.$router.push('/home/posts')
      } catch (e) {
        console.warn(e)
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
