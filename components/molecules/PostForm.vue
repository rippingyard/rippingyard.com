<template>
  <section>
    <Wysiwyg @update="updateContent" />
    <b-button @click="submit">新規追加</b-button>
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
      }

      this.savePost({
        post,
        notification: this.$buefy.notification
      })

    },
  }
}
</script>
