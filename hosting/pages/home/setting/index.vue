<template>
  <main class="frame page">
    <ManageHeading label="ユーザー設定" />
    <div class="form">
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
              <ImageUploader :default-image="avatar" :on-change="updateImage" />
            </div>
          </div>
        </div>
      </div>
      <div class="box wysiwyg">
        <h2>プロフィール</h2>
        <div class="textarea">
          <TextArea v-model="profile" :default="profile" />
        </div>
      </div>
      <div class="box wysiwyg">
        <button class="button" @click="submit">設定変更</button>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { isEmpty } from 'lodash'
import { getExt } from '~/plugins/file'
import { schemaUser } from '~/plugins/validators/user'

export default Vue.extend({
  // layout: 'manage',
  async fetch() {
    this.uid = this.$store.state.auth.me.uid
    this.me = await this.getUser(this.uid)
    this.displayName = this.$data.me.displayName || this.$data.me.uid
    this.profile = this.$data.me.profile || ''
    this.avatar = this.$data.me.avatar || ''
  },
  data() {
    return {
      uid: null,
      me: null,
      displayName: '',
      profile: '',
      image: '',
      avatar: '',
      errors: {},
    }
  },
  middleware: ['auth'],
  mounted() {},
  methods: {
    ...mapActions({
      getUser: 'user/getOne',
      saveUser: 'user/save',
    }),
    // updateContent(content: string): void {
    //   this.profile = content
    // },
    updateImage(file: any): void {
      this.image = file
    },
    async submit(): Promise<void> {
      try {
        if (this.image) {
          const ext = getExt(this.image)
          if (!ext) return

          const filename = `avatars/${this.$data.me.uid}.${ext}`
          const result = await (this as any).$fire.storage
            .ref()
            .child(filename)
            .put(this.image)
          this.avatar = await result.ref.getDownloadURL()
        }

        const params = {
          uid: this.$data.me.uid,
          displayName: this.displayName,
          profile: this.profile,
          avatar: this.avatar,
        }

        const { value, error } = schemaUser.validate(params)
        if (!isEmpty(error)) {
          console.error('Error', error?.details)
          return alert(error?.details)
        }
        await this.saveUser({
          user: value,
        })

        this.$router.push('/home')
      } catch (e) {
        alert(e)
      }
    },
  },
  head: (): any => {
    return {
      title: '設定変更',
    }
  },
})
</script>
<style lang="scss" scoped>
.page {
  margin-top: $gap;
  border: 1px solid $gray-black;
}
.form {
  padding: 10px 60px 60px;
}

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
