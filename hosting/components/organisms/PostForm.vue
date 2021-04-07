<template>
  <section class="block container">
    <Wysiwyg :post="post" @update="updateContent" />
    <div class="console">
      <div class="buttons">
        <button type="is-primary" class="button" @click="submit">
          {{ submitLabel }}
        </button>
        <button type="is-text" class="button no-border">プレビュー</button>
      </div>
    </div>
  </section>
</template>

<script>
import { isEmpty } from 'lodash'
import { mapActions } from 'vuex'
import { schemaPost } from '~/plugins/validators/post'

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
    }
  },
  mounted() {
    if (!this.$isAuthenticated(this.$store)) {
      // console.log('Not Logined')
      this.$router.push('/')
    }
    this.content = this.post.content
  },
  methods: {
    ...mapActions({
      savePost: 'post/save',
    }),
    updateContent(content) {
      this.content = content
    },
    async submit() {
      try {
        const params = {
          content: this.content,
          type: 'article',
          isPublic: true,
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

        this.$router.push('/home/posts')
      } catch (e) {
        // alert(e)
      }
    },
  },
}
</script>
