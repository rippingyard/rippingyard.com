<template>
  <div>
    <client-only>
      <div v-if="isAuthenticated" class="commentform">
        <div class="textarea">
          <TextArea
            v-model="content"
          />
          <div class="footer">
            <div class="footer-main">
              <div class="status"><span>{{ statusLabel }}</span></div>
            </div>
            <div class="footer-side">
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
      </div>
    </client-only>
  </div>
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
    isPublic: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 320,
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
    statusLabel(): string {
      return this.isPublic ? '全世界に公開' : '限定公開'
    }
  },
  methods: {
    ...mapActions({
      saveComment: 'comment/save',
      saveActivity: 'activity/save',
    }),
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
          isPublic: this.isPublic,
        }

        const { error } = schemaComment.validate(params)
        if (!isEmpty(error)) {
          console.log('Error', error?.details)
          return (this as any).snackAlert('投稿に失敗しました')
        }

        let status = 'succeeded'
        try {
          await this.saveComment({
            comment: params,
          })
          this.content = ''
          this.resetCount++
        } catch(e) {
          (this as any).snackAlert('投稿に失敗しました')
          status = 'failed'
        }

        await this.saveActivity({
          type: 'comment:create',
          status,
          payload: params,
        })
        
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
    display: flex;
    position: relative;
    justify-content: space-between;
    border-top: 1px solid $gray-black;
    padding-top: 15px;

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
