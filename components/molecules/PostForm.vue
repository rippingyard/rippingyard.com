<template>
  <section>
    <Wysiwyg @update="updateContent" />
    <div class="console-bottom">
      <div class="container">
        <b-button
          @click="submit"
          type="is-primary"
          inverted
          outlined>
          新規追加
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
      this.content = content
    },
    submit() {

      const post = {
        content: this.content,
        isPublic: true,
      }

      this.savePost({
        post,
        notification: this.$buefy.notification
      })

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
