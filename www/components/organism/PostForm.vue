<template>
  <div>
    <div class="form" :class="{ 'is-widget': isWidget }">
      <div class="main">
        <!-- <div v-show="showItem" class="item bg-dotted">
        <div class="inner">
          <FormItem />
          <ItemForm :item="item" color="yellow" @update-item="updateItem" />
        </div>
      </div> -->
        <div class="inner">
          <FormWysiwyg v-if="content !== undefined" v-model="content" />
        </div>
      </div>
      <div v-if="isWidget" class="footer" :class="footerClasses">
        <div class="footer-main">
          <!-- <div class="status"><span>{{ statusLabel }}</span></div> -->
          <AtomButton :class="{ 'disabled': !isReadyToSave }" class="button" :is-loading="isSaving" @click="submit()">
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
      <div v-if="!isWidget" class="side">
        <div class="inner">
          <div class="side-body">
            <div class="side-block">
              <label>公開日</label>
              <FormDatePicker v-if="date" v-model="date" />
            </div>
            <div class="side-block">
              <label>文字数</label>
              <div :class="{ 'is-over': isOver }" class="counter">
                {{ contentLength }} / {{ limit }}
              </div>
            </div>
            <div class="side-block">
              <label>記事タイプ</label>
              <div>
                <FormCheckboxes v-if="type !== undefined" :options="posttypes" v-model="type" />
              </div>
            </div>
            <div class="side-block">
              <label>記事設定</label>
              <div>
                <FormCheckboxes v-if="status !== undefined" :options="statuses" v-model="status" />
              </div>
            </div>
            <div class="side-block">
              <label>公開設定</label>
              <div>
                <FormCheckboxes v-if="publishStatus !== undefined" :options="publishStatuses" v-model="publishStatus" />
              </div>
            </div>
          </div>
          <div class="side-foot">
            <AtomButton :class="{ 'disabled': !isReadyToSave }" class="button" :is-loading="isSaving" :centered="true"
              :expanded="true" @click="submit()">
              {{ submitLabel }}
            </AtomButton>
          </div>
        </div>
      </div>
      <div class="sponly">
        <AtomButton :class="{ 'disabled': !isReadyToSave }" class="button" :is-loading="isSaving" :centered="true"
          :expanded="true" @click="submit()">
          {{ submitLabel }}
        </AtomButton>
      </div>
    </div>
    <ul v-if="urls && urls.length > 0">
      <li v-for="url in urls" :key="url">{{ url }}</li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { Timestamp } from 'firebase/firestore'
import { OriginalPost, Post, PostStatus, PostType } from '~/schemas/post';
// import { Item } from '~/types/item'
// import { permalink } from '~/services/post'
import { useSavePost } from '~/composables/save/useSavePost';
import { getLength } from '~~/utils/typography';
import { usePostLink } from '~/composables/link/usePostLink';
import { useBookmarks } from '~/composables/fetch/useBookmarks';
import { useEntityFilter } from '~/composables/filter/useEntityFilter';
// import { UseMutationReturnType } from '@tanstack/vue-query/build/lib/useMutation';

type PublishStatus = 'isPublic' | 'isPrivate';

type Props = {
  post?: OriginalPost;
  limit?: number;
  isWidget?: boolean;
  showItem?: boolean;
  isFooterDotted?: boolean;
  isFooterBordered?: boolean;
  isFooterFixed?: boolean;
}

const savePostObject = useSavePost();
const useBookmarksObject = useBookmarks();

const props = withDefaults(
  defineProps<Props>(),
  {
    limit: 800,
  }
);

const posttypes = computed(() => {

  const types = [];

  types.push({
    key: 'log',
    label: 'Log',
  });

  if (isOver.value) types.push({
    key: 'article',
    label: 'Article',
  })

  return types;
});

const statuses = computed(() => {
  return [
    {
      key: 'published',
      label: '公開',
    },
    {
      key: 'drafted',
      label: '下書き',
    }
  ];
});

const publishStatuses = computed(() => {
  return [
    {
      key: 'isPublic',
      label: '全世界に公開する',
    },
    {
      key: 'isPrivate',
      label: '非公開',
    }
  ];
});

const isWidget = computed(() => props.isWidget || false);
// const showItem = computed(() => props.showItem || false);
const footerClasses = {
  'bg-dotted': props.isFooterDotted || false,
  'bordered': props.isFooterBordered || false,
  'fixed': props.isFooterFixed || false,
}

const content = ref<string>();
const entities = ref<string[]>([]);
const type = ref<PostType>();
const status = ref<PostStatus>();
const urls = ref<string[]>([]);
const bookmarks = ref<{
  [id: string]: {
    title: string;
    description: string;
    url: string;
    image: string;
  }
}[]>([]);
const publishStatus = ref<PublishStatus>();
const isPublic = computed(() => publishStatus.value === 'isPublic');
const date = ref(new Date);
const isSaving = ref(false);

const contentTimer = ref<NodeJS.Timeout>();

const post = computed<Partial<OriginalPost>>(() => {
  return {
    ...defaultPost.value,
    ...{
      content: content.value,
      type: type.value,
      entities: entities.value,
      status: status.value,
      publishedAt: Timestamp.fromDate(date.value),
      isPublic: isPublic.value,
    },
  }
})
const defaultPost = computed<Partial<OriginalPost>>(() => props?.post || {
  type: 'article',
  publishedAt: Timestamp.fromDate(new Date),
});
const contentLength = computed<number>(() => getLength(content.value || ''));
const isOver = computed<boolean>(() => contentLength.value > props.limit);
const isEmpty = computed<boolean>(() => contentLength.value === 0);
const isReadyToSave = computed(() => !isEmpty.value);

const submitLabel = computed(() => props?.post ? '更新する' : '投稿する');

useEntityFilter(content);

onMounted(() => {
  if (!props.post) {
    content.value = '';
    type.value = 'log';
    status.value = 'drafted';
    publishStatus.value = 'isPrivate';
    return;
  }
  // const { mutateAsync } = useBookmarksObject as any;

  content.value = props.post.content;
  type.value = props.post.type !== 'note' ? props.post.type : 'article';
  status.value = props.post.status;
  publishStatus.value = props.post.isPublic ? 'isPublic' : 'isPrivate';
  date.value = props.post.publishedAt.toDate();

  // mutateAsync(content);
});

// watch(content, () => {

//   clearTimeout(contentTimer.value);
//   contentTimer.value = setTimeout(() => {
//     if (!content.value) return;
//     const results = mutateAsync(content.value);
//     console.log('results', results.value);
//   }, 5000);
//   // const results = mutateAsync(content.value);
// });

const submit = async () => {
  console.log('submit!', content);
  if (!savePostObject) return;

  const { mutateAsync: savePost } = savePostObject;

  // let status = 'failed';
  if (isSaving.value) return;

  const params: Partial<OriginalPost> = post.value;

  if (props.post?.id) params.id = props.post.id;
  if (params.type === 'note') params.type = 'article';

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
    clearForm();

    if (!newPost) return;

    const permalink = usePostLink(newPost);
    console.log('permalink!', permalink, newPost);
    navigateTo(permalink);
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
const clearForm = (): void => {
  content.value = '';
  // this.entities = []
  // this.item = null
  // console.log('clear!')
};
//     updateItem(val: any): void {
//       // console.log('updateItem', val)
//       this.item = !val ? null : val
//     },
// })
</script>
<style lang="scss" scoped>
.form {
  width: 100%;
  position: relative;
  display: flex;
  // z-index: 80000;
  // position: sticky;
  // height: calc(100vh - 60px);
  justify-content: space-between;
  // top: $gap;

  // padding-right: $navSize + $gap;

  @include until($desktop) {
    display: block;
    padding: $gap * 0.5;
  }

  .main {
    // flex-grow: 1;
    flex-shrink: 0;
    width: $mainSize;
    // overflow-y: auto;
    // padding-right: $gap;

    @include until($desktop) {
      width: 100%;
    }
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
    position: sticky;
    top: $gap;
    flex-shrink: 0;
    height: 100%;

    @include mobile {
      display: none;
    }

    >.inner {
      // position: sticky;
      // top: 0;
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
      flex-shrink: 1;
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
      // flex-direction: column;
    }

    .footer-main {
      display: flex;
      align-items: center;
      text-align: left;
      flex-grow: 1;

      @include mobile {
        // display: inline-block;
        // position: absolute;
        // top: 10px;
        // left: 0;
        flex-shrink: 0;
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
        margin-left: 15px;
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
