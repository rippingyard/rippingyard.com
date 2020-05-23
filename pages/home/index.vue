<template>
  <section class="main-content columns">
    <div class="container column is-6 is-offset-1">
      <PostList :limit="100" :owner="me" />
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
  data() {
    return {
      me: null
    }
  },
  head: () => {
    return {
      title: 'HOME'
    }
  },
  fetch() {
    this.me = this.$store.state.auth.me.uid
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

    // console.log(this.$store.state.auth.me.uid)
    // this.me = this.$store.state.auth.me.uid

    // console.log('me', this.me)

  },
}
</script>

<style>
.section {
  position: relative;
}
</style>
