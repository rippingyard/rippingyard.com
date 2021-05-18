<template>
  <client-only>
    <div v-if="isAuthenticated" class="commentform">
      <div class="textarea">
        <TextArea
          v-model="content"
          :reset-count="resetCount"
        />
        <div class="footer">
          <div
            :class="{'is-over': isOver}"
            class="counter"
          >{{ contentLength }} / {{ limit }}</div>
          <button
            :class="{'is-disabled': isOver || isEmpty}"
            class="button"
            @click="submit()"
          >コメントする</button>
        </div>
      </div>
    </div>
  </client-only>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { isEmpty } from 'lodash'
import { schemaComment } from '~/plugins/validators/comment'
import { getLength } from '~/plugins/typography'
export default Vue.extend({
  props: {
    parentId: {
      type: String,
      default: null,
    },
    limit: {
      type: Number,
      default: 180,
    },
  },
  data() {
    return {
      content: '',
      resetCount: 0,
    }
  },
  computed: {
    contentLength(): number {
      return getLength(this.content)
    },
    isAuthenticated(): boolean {
      return this.$isAuthenticated(this.$store)
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
      saveComment: 'comment/save',
    }),
    // updateContent(content: string): void {
    //   this.content = content
    // },
    async submit(): Promise<any> {
      if (this.isEmpty) {
        return (this as any).snackAlert('コメントが空です')
      }

      if (this.isOver) {
        return (this as any).snackAlert(`コメントできる文字数をオーバーしています`)
      }

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

        try {
          await this.saveComment({
            comment: params,
          })
          this.content = ''
          this.resetCount++
        } catch(e) {
          return (this as any).snackAlert('投稿に失敗しました')
        }

        console.log('finished to save', params)
      } catch (e) {
        console.warn(e)
      }
    },
  },
})
</script>
<style lang="scss" scoped>
.commentform {
  margin-bottom: $gap;
}

.textarea {
  border: 1px solid $gray-black;
  padding: 15px;

  .footer {
    border-top: 1px solid $gray-black;
    padding-top: 15px;
    text-align: right;
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
