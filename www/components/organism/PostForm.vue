<template>
  <div class="form" :class="{ 'is-widget': isWidget }">
    <div class="main">
      <div v-show="showItem" class="item bg-dotted">
        <div class="inner">
          <FormItem />
          <!-- <ItemForm :item="item" color="yellow" @update-item="updateItem" /> -->
        </div>
      </div>
      <div class="inner">
        <FormWysiwyg v-if="content !== undefined" v-model="content" />
      </div>
    </div>
    <div v-if="isWidget" class="footer" :class="footerClasses">
      <div class="footer-main">
        <!-- <div class="status"><span>{{ statusLabel }}</span></div> -->
        <AtomButton :class="{ 'disabled': isOver || isEmpty }" class="button" :is-loading="isSaving" @click="submit()">
          投稿する
        </AtomButton>
      </div>
      <div class="footer-side">
        <FormDatePicker v-model="date" />
        <div :class="{ 'is-over': isOver }" class="counter">
          {{ contentLength }} / {{ limit }}
        </div>
      </div>
    </div>
    <div v-if="!isWidget" class="side" :class="footerClasses">
      <div class="inner">
        <div class="side-body">
          <div class="side-block">
            <label>公開日</label>
            <FormDatePicker v-model="date" />
          </div>
          <div class="side-block">
            <label>文字数</label>
            <div :class="{ 'is-over': isOver }" class="counter">
              {{ contentLength }} / {{ limit }}
            </div>
          </div>
          <div class="side-block">
            <label>記事タイプ</label>
            <div :class="{ 'is-over': isOver }" class="counter">
              {{ post.type }}
            </div>
          </div>
        </div>
        <div class="side-foot">
          <!-- <div class="status"><span>{{ statusLabel }}</span></div> -->
          <AtomButton :class="{ 'disabled': !isReadyToSave }" class="button" :is-loading="isSaving" :centered="true"
            :expanded="true" @click="submit()">
            {{ submitLabel }}
          </AtomButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Timestamp } from 'firebase/firestore'
import { OriginalPost, Post, PostStatus } from '~/schemas/post';
// import { Item } from '~/types/item'
// import { permalink } from '~/services/post'
import { useAuth } from '~/composables/firebase/useAuth';
import { useSavePost } from '~/composables/save/useSavePost';
import { getLength } from '~~/utils/typography';

type Props = {
  post?: OriginalPost;
  limit?: number;
  isWidget?: boolean;
  showItem?: boolean;
  isFooterDotted?: boolean;
  isFooterBordered?: boolean;
  isFooterFixed?: boolean;
}

// type DataType = {
//   date: Date
//   item: Item | null
//   resetCount: number
//   isPublic: boolean
//   isOpen: boolean
//   isSaving: boolean
//   cleaningItem: number
// }

const { isAuthenticated } = useAuth();
const savePostObject = useSavePost();

const props = withDefaults(
  defineProps<Props>(),
  {
    limit: 800,
  }
);

const isWidget = computed(() => props.isWidget || false);
const showItem = computed(() => props.showItem || false);
const footerClasses = {
  'bg-dotted': props.isFooterDotted || false,
  'bordered': props.isFooterBordered || false,
  'fixed': props.isFooterFixed || false,
}

const content = ref<string>();
const entities = ref<string[]>([]);
const status = ref<PostStatus>('published');
const isPublic = ref(true);
const date = ref(new Date);
const isSaving = ref(false);

const post = computed<Partial<OriginalPost>>(() => {
  return {
    ...defaultPost.value,
    ...{
      content: content.value,
      // type: 'log',
      entities: entities.value,
      status: status.value,
      publishedAt: Timestamp.fromDate(date.value),
      isPublic: isPublic.value,
    },
  }
})
const defaultPost = computed<Partial<OriginalPost>>(() => props?.post || {
  type: 'article',
});
const contentLength = computed<number>(() => getLength(content.value || ''));
const isOver = computed<boolean>(() => contentLength.value > props.limit);
const isEmpty = computed<boolean>(() => contentLength.value === 0);
const isReadyToSave = computed(() => !isOver && !isEmpty);

const submitLabel = computed(() => props?.post ? '更新する' : '投稿する');

onMounted(() => {
  if (!props.post) {
    content.value = '';
    return;
  }
  content.value = props.post.content;
});

watch(date, () => {
  console.log('date updated!', date.value);
});

const submit = async () => {
  console.log('submit!', content);
  if (!savePostObject) return;

  const { mutate: savePost } = savePostObject;

  // let status = 'failed';
  if (isSaving.value) return;

  const params: Partial<OriginalPost> = post.value;

  if (props.post?.id) params.id = props.post.id;

  try {
    isSaving.value = true;

    //   if (this.item) {
    //     const q = await(this as any).$fire.firestore
    //       .collection('items')
    //       .where('isDeleted', '==', false)
    //       .where('path', '==', this.item.path)
    //       .where('type', '==', this.item.type)
    //       .limit(1)
    //       .get()

    //     if (!q.empty) {
    //       params.parent = q.docs[0].ref
    //     } else {
    //       const item = await this.saveItem(this.item)
    //       params.parent = item
    //     }
    //     // console.log('parent', params.parent)
    //   }

    //   //   if (this.post?.id) params.id = this.post.id
    //   //   console.log('val', schemaPost.validate(params))

    //   //   const { error } = schemaPost.validate(params)
    //   //   if (!isEmpty(error)) {
    //   //     console.log('Error', error.details)
    //   //     return this.snackAlert('投稿に失敗しました')
    //   //   }

    //   //   if (this.entities) {
    //   //     const existanceChecks = this.entities.map(async e => {
    //   //       console.log('Entity', e)
    //   //       return await this.$fire.firestore.doc(`entities/${encodeEntity(e)}`).get()
    //   //     })
    //   //     const existances = await Promise.all(existanceChecks)

    //   //     const promises = existances.filter(e => !e.exists).map(async e => {
    //   //       return await this.saveEntity({
    //   //         id: e.id,
    //   //       })
    //   //     })

    //   //     if (promises) await Promise.all(promises)
    //   //   }

    const newPost = await savePost(params);
    //   status = 'succeeded'

    console.log('NEWPOST!!!!', newPost);

    //   this.clearForm()
    //   this.$router.push(permalink(newPost.id))
  } catch (e) {
    console.error(e)
  }

  isSaving.value = false;
};

// export default Vue.extend({
//   data(): DataType {
//     return {
//       content: '',
//       date: new Date(),
//       entities: [],
//       resetCount: 0,
//       item: null,
//       isOpen: false,
//       isSaving: false,
//       cleaningItem: new Date().getTime(),
//     }
//   },
//   methods: {
//     ...mapActions({
//       saveItem: 'item/save',
//       savePost: 'post/save',
//       saveEntity: 'entity/save',
//       saveActivity: 'activity/save',
//     }),
//     toggleForm(): void {
//       this.isOpen = !this.isOpen
//     },
//     closeForm(): void {
//       this.isOpen = false
//     },
//     clearForm(): void {
//       this.content = ''
//       this.entities = []
//       this.item = null
//     },
//     updateItem(val: any): void {
//       // console.log('updateItem', val)
//       this.item = !val ? null : val
//     },
// })
</script>
<style lang="scss" scoped>
.form {
  width: 100%;
  // display: flex;
  // z-index: 80000;
  // position: sticky;
  // height: calc(100vh - 60px);
  // justify-content: flex-end;
  // top: $gap;

  // padding-right: $navSize + $gap;

  .main {
    // flex-grow: 1;
    // flex-shrink: 0;
    width: $mainSize;
    // overflow-y: auto;
    // padding-right: $gap;
  }

  .item {
    padding: 20px;
    border-bottom: 1px solid $black;
    flex-shrink: 0;

    >.inner {
      background: $yellow;
      border: 1px solid $black;
    }
  }

  .side {
    width: $navSize;
    position: absolute;
    top: 0;
    right: 0;
    // flex-shrink: 0;

    @include mobile {
      display: none;
    }

    >.inner {
      position: sticky;
      top: 0;
      display: flex;
      flex-direction: column;
      align-content: space-between;
      // height: 100%;
      border: 1px solid $black-transparent-40;
      height: calc(100vh - 60px);
    }

    .side-body {
      overflow-y: auto;
      align-self: stretch;
      flex-grow: 1;
      flex-shrink: 0;
      padding: $gap * 0.3;
    }

    .side-block {
      margin-bottom: 10px;

      >label {
        font-size: 0.8rem;
        font-weight: 800;
      }
    }

    .side-foot {
      padding: $gap * 0.3;
      border-top: 1px solid $black-transparent-40;
      flex-shrink: 0;
    }
  }

  .footer {
    display: flex;
    position: relative;
    width: 100%;
    padding: 20px;
    border-top: 1px solid $black;
    flex-shrink: 0;
    align-items: center;

    &.bordered {
      border: 1px solid $black;
    }

    &.fixed {
      position: absolute;
      bottom: 0;
    }

    @include mobile {
      width: 100%;
      flex-direction: column;
    }

    .footer-main {
      display: flex;
      align-items: center;
      text-align: left;
      flex-grow: 1;

      @include mobile {
        display: inline-block;
        position: absolute;
        top: 10px;
        left: 0;
      }
    }

    .footer-side {
      display: flex;
      align-items: center;
      text-align: right;
      flex-grow: 1;

      @include mobile {
        width: 100%;
        text-align: right;
      }
    }

    .status {
      display: inline-block;
      padding: 10px 0 0 6px;

      >span {
        font-weight: 800;
        border-bottom: 2px solid $black;
      }

      @include mobile {
        padding-bottom: 10px;
      }
    }

    .counter {
      display: inline-block;
      margin-right: 10px;
      flex-grow: 1;

      &.is-over {
        color: $red;
      }
    }

    .button {
      display: inline-block;
    }
  }

  &.is-widget {
    display: flex;
    flex-direction: column;
    height: 100%;

    .main {
      width: 100%;
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      >.inner {
        padding: 20px;
        // flex-grow: 1;
        // overflow-y: auto;
      }
    }
  }
}
</style>
