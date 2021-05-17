<template>
  <div class="commentform">
    <TextArea @update="updateContent" />
    <button class="button" @click="submit()">コメントする</button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { isEmpty } from 'lodash'
import { schemaComment } from '~/plugins/validators/comment'
export default Vue.extend({
  props: {
    parentId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      content: '',
    }
  },
  methods: {
    ...mapActions({
      saveComment: 'comment/save',
    }),
    updateContent(content: string): void {
      this.content = content
    },
    async submit(): Promise<any> {
      // console.log('Comment', this.content)
      try {
        const params = {
          content: this.content,
          entities: [],
          parentId: this.parentId,
          isPublic: true,
        }

        const { error } = schemaComment.validate(params)
        if (!isEmpty(error)) {
          console.log('Error', error?.details)
          return (this as any).snackAlert('投稿に失敗しました')
        }

        await this.saveComment({
          comment: params,
        })

        console.log('finished to save', params)
      } catch (e) {
        console.warn(e)
      }
    },
  },
})
</script>