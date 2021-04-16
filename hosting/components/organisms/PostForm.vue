<template>
  <section class="block container">
    <Wysiwyg :post="post" @update="updateContent" />
    <div class="console">
      <div class="buttons">
        <button type="is-primary" class="button" @click="confirm">最終確認</button>
        <button type="is-text" class="button no-border" @click="showPreview()">プレビュー</button>
      </div>
    </div>
    <section v-if="isPreviewing" class="preview overlay">
      <div class="inner block container">
        <button class="close" @click="closePreview"><fa-icon :icon="['far', 'times-circle']" class="icon" /></button>
        <div class="block container">
          <Content v-html="filteredContent" />
        </div>
      </div>
    </section>
    <section v-if="isSetting" class="setting overlay">
      <div class="inner block container">
        <button class="close" @click="closeSetting"><fa-icon :icon="['far', 'times-circle']" class="icon" /></button>
        <div class="block container">
          <div>
            <div>
              {{ isPublic ? '全世界に公開' : '会員限定公開' }}
            </div>
            <button type="is-primary" class="button" @click="togglePublic">
              {{ isPublic ? '会員限定にする' : '全世界に公開する' }}
            </button>
          </div>
          <p><button type="is-primary" class="button" @click="submit">
            {{ submitLabel }}
          </button></p>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { isEmpty } from 'lodash'
import { mapActions } from 'vuex'
import { schemaPost } from '~/plugins/validators/post'
import { filterContent } from '~/services/post'

export default {
  props: {
    // postId: {
    //   type: String,
    //   default: null,
    // },
    post: {
      type: Object,
      default: () => {
        return {}
      },
    },
    submitLabel: {
      type: String,
      default: '新規投稿',
    },
  },
  data() {
    return {
      content: '',
      isPublic: true,
      isPreviewing: false,
      isSetting: false,
    }
  },
  computed: {
    filteredContent() {
      return filterContent(this.content)
    }
  },
  mounted() {
    if (!this.$isAuthenticated(this.$store)) {
      // console.log('Not Logined')
      this.$router.push('/')
    }
    this.content = this.post.content || ''
    this.isPublic = !!this.post.isPublic
    console.log('isPublic', this.isPublic)
  },
  methods: {
    ...mapActions({
      savePost: 'post/save',
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
    async submit() {
      try {
        const params = {
          content: this.content,
          type: 'article',
          isPublic: this.isPublic,
        }
        if (this.post.id) params.id = this.post.id
        console.log('val', schemaPost.validate(params))

        const { error } = schemaPost.validate(params)
        if (!isEmpty(error)) {
          // console.log('Error', error.details)
          return this.snackAlert('投稿に失敗しました')
        }

        const post = Object.assign(this.post, params)

        await this.savePost({
          post,
        })

        console.log('post', post)

        this.$router.push('/home/posts')
      } catch (e) {
        // alert(e)
      }
    },
  },
}
</script>
<style lang="scss" scoped>

.preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 50px 0;
  z-index: 20000;
  
  .inner {
    position: relative;
    background-color: $white;
    padding: $gap * 2;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    z-index: 20001;
  }
}

.setting {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 50px 0;
  z-index: 20000;
  
  .inner {
    position: relative;
    background-color: $white;
    padding: $gap * 2;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    z-index: 20001;
  }
}

.overlay {
  &::before {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: $black, $alpha: 0.8);
    z-index: 20000;
  }
}

.close {
  position: absolute;
  top: 0;
  left: -40px;
  color: $white;
  > .icon {
    font-size: 2rem;
  }
}

</style>
