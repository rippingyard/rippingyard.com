<template>
  <div>
    <client-only>
      <nav v-if="isAuthenticated" class="nav">
        <CommentTrigger :click="toggleForm" />
        <div class="form" :class="{ open: isOpen }">
          <div class="inner">
            <TextArea
              v-model="content"
              :reset-count="resetCount"
            />
          </div>
          <div class="footer">
            <div class="footer-main">
              <!-- <div class="status"><span>{{ statusLabel }}</span></div> -->
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
              >投稿する</button>
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
import { getLength } from '~/plugins/typography'
export default Vue.extend({
  props: {
    limit: {
      type: Number,
      default: 800,
    },
  },
  data() {
    return {
      content: '',
      entities: [],
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
  methods: {
    ...mapActions({
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
    async submit(): Promise<void> {
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
        type: 'post:create',
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

// .nav {
  // position: fixed;
  // // background-color: $white;
  // width: calc(100% - 55px);
  // height: 100%;
  // top: 0;
  // right: calc(-100% + 60px);
  // z-index: 99999;
  // transition: all 200ms 0s ease-out;
  // &.open {
  //   right: 0;
  // }

  // .body {
  //   overflow-y: auto;
  //   position: relative;
  //   z-index: 100;
  //   height: 100%;
  //   > .inner {
  //     padding: 50px 75px;
  //     @include mobile {
  //       padding: 0;
  //     }
  //   }
  // }

  // .overlay {
  //   width: 100%;
  //   height: calc(100% - 50px);
  //   position: absolute;
  //   top: 0;
  //   left: -55px;
  //   z-index: 99;
  //   opacity: 0;
  //   background-color: $black;
  // }

  // @include mobile {
  //   right: calc(-100% + 55px);
  //   .body {
  //     padding: $gap;
  //   }
  // }
// }
</style>
