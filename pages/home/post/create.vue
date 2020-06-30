<template>
  <section class="main-content columns">
    <div class="container column is-8 is-offset-2">
      <section class="section">
        <PostForm/>
      </section>
    </div>
  </section>
</template>

<script>

import { mapActions } from 'vuex'
import PostForm from '~/components/molecules/PostForm'

export default {
  components: {
    PostForm,
  },
  head: () => {
    return {
      title: '新規投稿 - HOME'
    }
  },
  async mounted() {

    if( await !this.can('post.self') || !this.$isAuthenticated ) {
      this.$buefy.notification.open({
        duration: 5000,
        message: '投稿権限がありません',
        position: 'is-bottom-right',
        type: 'is-danger',
        hasIcon: false
      })
      this.$router.push('/signin')
    }

  },
  methods: {
    ...mapActions({
      can: 'auth/can'
    })
  },
}
</script>
