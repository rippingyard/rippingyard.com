<template>
  <section class="columns">
    <div class="column c20">
      <ManageNav />
    </div>
    <div class="column c80">
      <ManageHeading label="設定" />
      <div class="block container">
        <div class="columns">
          <div class="column c60">
            <div class="box wysiwyg">
              <h2>表示名</h2>
              <p>
                <input v-model="displayName" class="input bold" />
              </p>
            </div>
          </div>
          <div class="column c40">
            <div class="box wysiwyg">
              <h2>プロフィール画像</h2>
              <div>
                <ImageUploader :image="avator" :on-change="updateImage" />
              </div>
            </div>
          </div>
        </div>
        <div class="box wysiwyg">
          <h2>プロフィール</h2>
          <div class="textarea">
            <TextArea :default="profile" @update="updateContent" />
          </div>
        </div>
        <div class="box wysiwyg">
          <button class="button" @click="submit">設定変更</button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions } from 'vuex'
import { isEmpty } from 'lodash'
import { getExt } from '~/plugins/file'
import { schemaUser } from '~/plugins/validators/user'

export default {
  layout: 'manage',
  fetch() {
    this.me = this.$store.state.auth.me
    this.displayName = this.me.displayName || this.me.id
    this.profile = this.me.profile || this.me.profile
    this.avator = this.me.avator || ''
  },
  data() {
    return {
      me: null,
      displayName: '',
      profile: '',
      image: '',
      avator: '',
      errors: {},
    }
  },
  middleware: ['auth'],
  mounted() {
    if (!this.$isAuthenticated(this.$store)) {
      // this.$buefy.notification.open({
      //   duration: 5000,
      //   message: 'ログインしてください',
      //   position: 'is-bottom-right',
      //   type: 'is-danger',
      //   hasIcon: false,
      // })
      this.$router.push('/login')
    }
  },
  methods: {
    ...mapActions({
      saveUser: 'user/save',
    }),
    updateContent(content) {
      this.profile = content
    },
    updateImage(file) {
      this.image = file
    },
    async submit() {
      try {
        if (this.image) {
          const ext = getExt(this.image)
          if (!ext) return

          const filename = `avators/${this.me.id}.${ext}`
          const result = await this.$fire.storage
            .ref()
            .child(filename)
            .put(this.image)
          this.avator = await result.ref.getDownloadURL()
          console.log('File', result, this.avator)
        }

        const params = {
          id: this.me.id,
          displayName: this.displayName,
          profile: this.profile,
          avator: this.avator,
        }
        console.log('val', schemaUser.validate(params))
        const { error } = schemaUser.validate(params)
        if (!isEmpty(error)) {
          return alert(error.details)
        }
        const user = Object.assign(this.me, params)
        await this.saveUser({
          user,
        })

        this.$router.push('/home')
      } catch (e) {
        alert(e)
      }
    },
  },
  head: () => {
    return {
      title: '設定変更',
    }
  },
}
</script>

<style lang="scss" scoped>
.box {
  padding: 0 30px;
  // border-left: 4px solid $black;
  margin-bottom: 60px;
  h2 {
    line-height: 1;
    padding-top: 0;
    font-size: 1rem;
  }
  .button {
    text-decoration: none;
  }
}
.input {
  padding: 0 0 8px;
  border-bottom: 1px solid $gray-black;
  width: 100%;
  font-size: 1.4rem;
  &.bold {
    font-weight: 800;
  }
}
.textarea {
  padding: $gap;
  border: 1px solid $gray-black;
}
</style>
