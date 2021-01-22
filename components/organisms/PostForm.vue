<template>
  <section>
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
          id: this.post ? this.post.id : null,
          content: this.content,
          isPublic: true,
        }
        console.log(schemaPost.validate(params))

        const { error } = schemaPost.validate(params)
        if (!isEmpty(error)) {
          return alert(error.details)
        }

        const post = Object.assign(this.post, params)

        await this.savePost({
          post,
        })

        this.$router.push('/home/posts')
      } catch (e) {
        alert(e)
      }
    },
  },
}
</script>
