<template>
  <section>
    <Wysiwyg @update="updateContent" :post="post" />
    <div class="console-bottom">
      <div class="container">
        <b-button
          @click="submit"
          type="is-primary"
          inverted
          outlined>
          {{  submitText }}
        </b-button>
        <b-button
          type="is-text"
          inverted
          outlined>
          プレビュー
        </b-button>
      </div>
    </div>
  </section>
</template>

<script>

import { mapActions } from 'vuex'
import Wysiwyg from '~/components/atoms/Wysiwyg'

export default {
  components: {
    Wysiwyg,
  },
  props: {
    postId: {
      type: String,
      default: null,
    },
    post: {
      type: Object,
      default: () => {
        return {}
      },
    },
    submitText: {
      type: String,
      default: '新規投稿',
    }
  },
  data() {
    return {
      content: '',
    }
  },
  mounted() {

    if( !this.$isAuthenticated(this.$store) ) {
      console.log('Not Logined')
      this.$router.push('/')
    }

  },
  methods: {
    ...mapActions({
      savePost: 'post/save'
    }),
    updateContent(content) {
      console.log('Updated!', content)
      this.content = content
    },
    submit() {

      const post = Object.assign(this.post, {
        id: this.postId,
        content: this.content,
        isPublic: true,
      })

      console.log(post)

      this.savePost({
        post,
        notification: this.$buefy.notification
      })

      this.$router.push('/home')

    },
  }
}
</script>

<style lang="scss" scoped>

.console-bottom {
  position: fixed;
  width: 100%;
  padding: 15px;
  left: 0;
  bottom: 0;
  background-color: rgba( 41, 85,113,1);
}

.is-text {
  color: #FFF;
  text-decoration: none;
  opacity: .75;
  &:hover {
    background-color: transparent;
    color: #FFF;
    opacity: 1;
  }
}

</style>
