<template>
  <section class="main-content columns">
    <div class="container column is-6 is-offset-1">
      <PostList :limit="12" />
    </div>
    <div class="container column is-5">
      <section class="section">
        <InfoMe/>
        <div class="buttons">
          <b-button tag="nuxt-link" to="/home/post/create">新規投稿</b-button>
        </div>
      </section>
    </div>
  </section>
</template>

<script>

import PostList from '~/components/organisms/PostList'
import InfoMe from '~/components/molecules/InfoMe'

export default {
  components: {
    InfoMe,
    PostList,
  },
  head: () => {
    return {
      title: 'HOME'
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

<style>
.section {
  position: relative;
}
</style>
