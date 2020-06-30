<template>
  <section class="main-content columns">
    <Belt/>
    <div class="container column is-12">
      <section class="section">
        <div class="list">
          <div class="list-container">
          
            <!-- TODO: Firebase Ruleがおかしいので、直したらisTimeline=falseに -->
            <PostTable :limit="100" :owner="me" :isTimeline="true" />
          
            <InfoMe/>
            <div class="buttons">
              <b-button v-if="permissions.createPost" tag="nuxt-link" to="/home/post/create">新規投稿</b-button>
            </div>
          
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>

import { mapActions } from 'vuex'
import PostTable from '~/components/organisms/PostTable'
import InfoMe from '~/components/molecules/InfoMe'
import Belt from '~/components/atoms/Belt/Global'

export default {
  components: {
    InfoMe,
    PostTable,
    Belt,
  },
  data() {
    return {
      me: null,
      permissions: {
        createPost: false,
        login: false,
      }
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
  async mounted() {

    this.permissions.login = await this.can('login')
    this.permissions.createPost = await this.can('post.self')

    if( !this.permissions.login || !this.$isAuthenticated ) {

      this.$buefy.notification.open({
        duration: 5000,
        message: !this.$isAuthenticated ? 'ログインしてください' : '権限がありません',
        position: 'is-bottom-right',
        type: 'is-danger',
        hasIcon: false
      })

      this.$router.push(!this.$isAuthenticated ? '/signin' : '/')
    }

  },
  methods: {
    ...mapActions({
      can: 'auth/can'
    })
  },
}
</script>

<style>
.section {
  position: relative;
}
</style>
