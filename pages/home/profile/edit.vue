<template>
  <section class="main-content columns">
    <div class="container column is-8 is-offset-2">
      <section class="section">
        <p class="menu-label is-hidden-touch">ユーザー情報編集</p>
        <form class="list">
          <div class="list-container">
            <b-field label="表示名">
              <b-input v-model="displayName" />
            </b-field>
            <b-field label="プロフィール">
              <b-input v-model="profile" type="textarea" />
            </b-field>
            <b-field label="メイン画像">
              <b-upload v-model="dropFiles"
                multiple
                drag-drop>
                <section class="section">
                  <div class="content has-text-centered">
                    <p>
                      <b-icon
                        icon="upload"
                        size="is-large">
                      </b-icon>
                    </p>
                    <p>Drop your files here or click to upload</p>
                  </div>
                </section>
              </b-upload>
            </b-field>
          </div>
        </form>
      </section>
    </div>
  </section>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      displayName: null,
      profile: null
    }
  },
  head: () => {
    return {
      title: 'ユーザー編集 - HOME'
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

<style scoped lang="scss">
.field {
  padding: 20px 25px;
  border-bottom: 1px dotted $black;
}
</style>
