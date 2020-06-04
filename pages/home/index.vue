<template>
  <section class="main-content columns">
    <div class="container column is-11 is-offset-1">
      <section class="section">
        <div class="list">
          <div class="list-container">
          
            <!-- TODO: Firebase Ruleがおかしいので、直したらisTimeline=falseに -->
            <PostTable :limit="100" :owner="me" :isTimeline="true" />
          
            <InfoMe/>
            <div class="buttons">
              <b-button tag="nuxt-link" to="/home/post/create">新規投稿</b-button>
            </div>
          
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>

import PostTable from '~/components/organisms/PostTable'
import InfoMe from '~/components/molecules/InfoMe'

export default {
  components: {
    InfoMe,
    PostTable,
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
