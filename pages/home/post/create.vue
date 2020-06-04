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
  mounted() {

    if( !this.$isAuthenticated(this.$store) ) {
      this.$buefy.notification.open({
        duration: 5000,
        message: 'ログインしてください',
        position: 'is-bottom-right',
        type: 'is-danger',
        hasIcon: false
      })
      this.$router.push('/signin')
    }

  },
}
</script>
