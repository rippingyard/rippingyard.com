<template>
  <BlockMain horizontalSize="large">
    <BlockLoading :is-loading="!me" :is-error="false">
      <!-- <ManageHeading label="ユーザー設定" /> -->
      <div v-if="isReady" class="form">
        <div class="columns">
          <div class="column c60">
            <div class="box wysiwyg">
              <h2>表示名</h2>
              <FormInput v-model="displayName" placeholder="表示名を入力" @click="removeError('displayName')" />
            </div>
          </div>
          <div class="column c40">
            <div class="box wysiwyg">
              <h2>プロフィール画像</h2>
              <FormImageUploader :default-image="avatar" :is-auto-upload="true" :on-change="uploadImage" />
            </div>
          </div>
        </div>
        <div class="box wysiwyg">
          <h2>プロフィール</h2>
          <FormTextArea v-model="profile" placeholder="プロフィールを入力" @click="removeError('profile')" />
        </div>
        <div class="box wysiwyg">
          <AtomButton class="button" :is-loading="isSaving" @click="submit">設定変更</AtomButton>
        </div>
      </div>
    </BlockLoading>
  </BlockMain>
</template>
<script lang="ts" setup>
// import { isEmpty } from 'lodash'
// import { getExt } from '~/plugins/file'
// import { schemaUser } from '~/plugins/validators/user'

import { useSaveUser } from '~/composables/save/useSaveUser';
import { useMe } from '~~/composables/fetch/useMe';
import { User } from '~~/schemas/user';

const saveUserObject = useSaveUser();
const { me } = useMe();

const isReady = ref(false);
const isSaving = ref(false);
const displayName = ref('');
const profile = ref('');
const avatar = ref('');

onMounted(() => setDefault(me.value));
watch(me, () => setDefault(me.value));

const setDefault = (me?: User) => {
  console.log('me!', me);
  if (!me) return;
  displayName.value = me?.displayName || '';
  profile.value = me?.profile || '';
  avatar.value = me?.avatar || '';
  isReady.value = true;
}

// export default Vue.extend({
//   // layout: 'manage',
//   async fetch() {
//     this.uid = this.$store.state.auth.me.uid
//     this.me = await this.getUser(this.uid)
//     this.displayName = this.$data.me.displayName || this.$data.me.uid
//     this.profile = this.$data.me.profile || ''
//     this.avatar = this.$data.me.avatar || ''
//   },
//   data() {
//     return {
//       uid: null,
//       me: null,
//       displayName: '',
//       profile: '',
//       image: '',
//       avatar: '',
//       errors: {},
//     }
//   },
//   middleware: ['auth'],
//   mounted() {},
//   methods: {
//     ...mapActions({
//       getUser: 'user/getOne',
//       saveUser: 'user/save',
//     }),
//     // updateContent(content: string): void {
//     //   this.profile = content
//     // },
//     updateImage(file: any): void {
//       this.image = file
//     },

const uploadImage = (url: string) => {
  avatar.value = url;
}

const removeError = (field: string) => {
  console.log('error', field);
};

const submit = async () => {
  if (!saveUserObject) return;

  const { mutateAsync: saveUser } = saveUserObject;

  const params = {
    ...me.value,
    displayName: displayName.value,
    avatar: avatar.value,
    profile: profile.value,
  };

  try {
    isSaving.value = true;

    console.log('params', params);
    await saveUser(params);

  } catch (e) {
    console.error(e);
  }

  isSaving.value = false;
};

//     async submit(): Promise<void> {
//       try {

//         const params = {
//           uid: this.$data.me.uid,
//           displayName: this.displayName,
//           profile: this.profile,
//           avatar: this.avatar,
//         }

//         const { value, error } = schemaUser.validate(params)
//         if (!isEmpty(error)) {
//           console.error('Error', error?.details)
//           return alert(error?.details)
//         }
//         await this.saveUser({
//           user: value,
//         })

//         this.$router.push('/home')
//       } catch (e) {
//         alert(e)
//       }
//     },
//   },
//   head: (): any => {
//     return {
//       title: '設定変更',
//     }
//   },
// })
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
