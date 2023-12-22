<template>
  <div>
    <div class="form" :class="{ 'is-widget': isWidget }">
      <div class="main">
        <div class="inner">
          <FormWysiwyg v-if="content !== undefined" v-model="content" />
        </div>
      </div>
      <div v-if="isWidget" class="footer" :class="footerClasses">
        <div class="footer-main">
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
    <BlockBookmarks :urls="urls" :save="true" />
  </div>
</template>
<script lang="ts" setup>
import { DocumentData, DocumentReference, Timestamp } from 'firebase/firestore'
import { OriginalPost, PostStatus, PostType } from '~/schemas/post';
import { useSavePost } from '~/composables/save/useSavePost';
import { useSaveEntity } from '~/composables/save/useSaveEntity';
import { getLength } from '~~/utils/typography';
import { usePostLink } from '~/composables/link/usePostLink';
import { useEntityFilter } from '~/composables/filter/useEntityFilter';
import { useDocReference } from '~~/composables/firestore/useDocReference';
import { useEntityId } from '~~/composables/utils/useEntityId';
import { useSnapshot } from '~~/composables/firestore/useSnapshot';
import { Entity, EntityType } from '~~/schemas/entity';
import { useRelation } from '~~/composables/fetch/useRelation';
import { useSaveRelation } from '~~/composables/save/useSaveRelation';
import { useClearRelations } from '~~/composables/save/useClearRelations';
import { useRemoveEntityPrefix } from '~~/composables/utils/useRemoveEntityPrefix';
import { useTagSuggestion } from '~~/composables/suggestion/useTagSuggestion';

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

const content = ref<string>();
const type = ref<PostType>();
const status = ref<PostStatus>();
const filteredContents = ref<ReturnType<typeof useEntityFilter>>();
const publishStatus = ref<PublishStatus>();
const isPublic = computed(() => publishStatus.value === 'isPublic');
const date = ref(new Date);
const isSaving = ref(false);

const mutatePost = useSavePost();
const mutateEntity = useSaveEntity();
const mutateRelation = useSaveRelation();
const mutateClearRelations = useClearRelations();

const { refresh: refleshTag } = useTagSuggestion();

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

  if (type.value === 'article' || isOver.value) types.push({
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
const footerClasses = {
  'bg-dotted': props.isFooterDotted || false,
  'bordered': props.isFooterBordered || false,
  'fixed': props.isFooterFixed || false,
}

const post = computed<Partial<OriginalPost>>(() => {
  return {
    ...defaultPost.value,
    ...{
      content: content.value,
      type: type.value,
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

const urls = computed(() => filteredContents.value?.urls || []);
const tags = computed(() => filteredContents.value?.tags || []);

onMounted(() => {
  content.value = props.post?.content || '';
  type.value = props.post?.type || 'article';
  status.value = props.post?.status || 'drafted';
  publishStatus.value = props.post?.isPublic ? 'isPublic' : 'isPrivate';
  date.value = props.post?.publishedAt.toDate() || new Date();

  filteredContents.value = useEntityFilter(content);
});

const submit = async () => {
  console.log('submit!', content.value);
  filteredContents.value = useEntityFilter(content);

  if (isSaving.value) return;

  const params: Partial<OriginalPost> = post.value;

  if (props.post?.id) params.id = props.post.id;
  if (params.type === 'note') params.type = 'article';

  params.entities = [];

  const entities = {
    tags: (tags.value || []).map(t => useDocReference(useEntityId(t.replace(/^#/, ''), 'tag'), 'entities')),
    urls: (urls.value || []).map(u => useDocReference(useEntityId(u, 'bookmark'), 'entities')),
  }

  try {
    isSaving.value = true;

    console.log('params', params);

    const by = useDocReference(params.id, 'posts');

    const setEntities = async (entities: DocumentReference<DocumentData>[], type: EntityType) => {
      if (entities.length === 0) return [];
      return await Promise.all(entities.map(async entity => {

        const entityDoc = await useSnapshot<Entity>({
          id: entity.id,
          collection: 'entities',
        });
        console.log('entity', entityDoc.exists());

        if (!entityDoc.exists()) {
          await mutateEntity({
            id: entity.id,
            name: useRemoveEntityPrefix(entity.id, type),
            type,
          });
        }

        const to = useDocReference(entity.id, 'entities');

        const as = type === 'bookmark' ? type : 'relation';

        const relatedBy = await useRelation(by, to, as);

        if (!relatedBy) {
          await mutateRelation({
            by,
            to,
            as,
          });
        }

        const relatedTo = await useRelation(to, by, as);

        if (!relatedTo) {
          await mutateRelation({
            by: to,
            to: by,
            as,
          });
        }

        return entity;
      }));
    }

    await mutateClearRelations(by);

    if (entities.tags.length > 0) params.entities.push(...await setEntities(entities.tags, 'tag'));
    if (entities.urls.length > 0) params.entities.push(...await setEntities(entities.urls, 'bookmark'));

    refleshTag();

    const newPost = await mutatePost(params);
    console.log('NEWPOST!!!!', newPost);
    clearForm();

    if (!newPost) return;

    navigateTo(usePostLink(newPost));
  } catch (e) {
    console.error(e)
  }

  isSaving.value = false;
};

const clearForm = (): void => {
  content.value = '';
};
</script>
<style lang="scss" scoped>
.form {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;

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