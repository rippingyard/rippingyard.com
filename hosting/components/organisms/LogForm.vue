<template>
  <section class="block container">
    <TextArea
      v-model="content"
      :default="content"
      :reset-count="resetCount"
    />
    <div class="console">
      <div class="buttons">
        <button
          type="is-primary"
          class="button"
          @click="submit"
        >{{ submitLabel }}</button>
        <button
          type="is-text"
          class="button no-border"
          @click="showPreview"
        >プレビュー</button>
      </div>
    </div>
    <Modal v-if="isPreviewing" :on-close="closePreview">
      <div class="preview">
        <Content v-html="filteredContent" />
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
      default: '更新する',
    },
  },
  data() {
    return {
      content: '',
      entities: [],
      resetCount: 0,
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
  created() {
    if (!this.$isAuthenticated(this.$store)) {
      this.$router.push('/')
    }
    if (this.post) {
      this.content = this.post.content || ''
      this.isPublic = !!this.post.isPublic
      this.entities = this.post.entities || []
      this.status = this.post.status
    }
    console.log('Content', this.content)
  },
  methods: {
    ...mapActions({
      savePost: 'post/save',
      saveEntity: 'entity/save',
      saveActivity: 'activity/save',
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
      let status = 'failed'
      if (this.isSaving) return

      const params = {
        content: this.content,
        type: 'log',
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
        this.$router.push('/home/logs')
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
  padding: $gap * 1.4 $gap * 2;
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
