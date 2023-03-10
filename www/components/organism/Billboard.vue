<template>
  <BlockLoading :is-loading="postsRef.isLoading.value" :is-error="postsRef.isError.value">
    <section class="billboard" :class="className">
      <div class="frame no-header">
        <div class="content" :class="{ 'full': !thumbnail }">
          <div class="content-inner">
            <h1 class="title">
              <nuxt-link :to="permalink">
                {{ title }}
              </nuxt-link>
            </h1>
            <div class="summary" v-html="summary" />
          </div>
        </div>
        <div v-if="thumbnail" class="image">
          <nuxt-link :to="permalink">
            <img :src="thumbnail" />
          </nuxt-link>
        </div>
      </div>
      <ul class="nav">
        <li v-if="index > 0" @click="go(-1)">
          <IconAngleLeft />
        </li>
        <li v-else class="is-disabled">
          <IconAngleLeft />
        </li>
        <li v-if="index + 1 < posts.length" @click="go(1)">
          <IconAngleRight />
        </li>
        <li v-else class="is-disabled">
          <IconAngleRight />
        </li>
      </ul>
    </section>
  </BlockLoading>
</template>
<script lang="ts" setup>
import { usePosts } from '~~/composables/fetch/usePosts';
import { usePostLink } from '~~/composables/link/usePostLink';
import { OriginalPost } from '~~/schemas/post';
import { getSummary, getThumbnailFromText, getTitle, hasTitle } from '~~/utils/typography';
import { numberByString } from '~/utils';

const index = ref(0);
const postsRef = usePosts({
  where: [
    { key: 'type', val: ['article'] },
  ],
});
const posts = computed<OriginalPost[]>(() => postsRef.data.value || []);
const post = computed<OriginalPost | undefined>(() => {
  if (posts.value.length === 0 || !posts.value[index.value]) return;
  return posts.value[index.value];
});

// type PostType = Post & {
//   parent?: Post
// }

// type DataType = {
//   post?: PostType
//   index: number
// }

//   computed: {
// const hasTitle = computed((): boolean => {
//   return post.value ? hasTitle(post.value.content) : false;
// });
const hasParentTitle = computed((): boolean => post.value ? !!post.value.parent : false);
//     hasThumbnail(): boolean {
//       return this.post ? hasThumbnail(this.post) : false
//     },
const title = computed((): string => {
  if (!post.value) return '';
  if (hasTitle(post.value.content)) return getTitle(post.value.content);
  // if (this.hasParentTitle) return this.post.parent?.name.ja
  return getTitle(post.value.content);
});
const summary = computed<string>(() => {
  if (!post.value) return '';
  return getSummary(
    post.value.content,
    !thumbnail.value ? 480 : 180
  )
});
const thumbnail = computed((): string => post.value ? getThumbnailFromText(post.value.content) : '');
const permalink = computed((): string => post.value ? usePostLink(post.value) : '');

const className = computed<string>(() => post.value ? `bgcolor-${numberByString(post.value.id) % 4}` : '');

const go = (step: number): void => {
  if (posts.value.length > 0) index.value += step;
};

onMounted(() => {
  go(Math.round(Math.random() * (posts.value.length - 1)));
});

</script>
<style lang="scss" scoped>
.billboard {
  display: flex;
  position: relative;
  align-items: center;
  // padding-top: $navMargin;
  min-height: 100vh;
  width: 100%;
  margin-bottom: $gap * 0.5;

  .frame {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }

  .content {
    width: calc(100% - 500px);
    max-width: 100%;
    font-size: 0.9rem;
    padding: $gap * 0.5 0;
    display: flex;
    align-items: center;

    &.full {
      width: 100%;
    }

    .title {
      font-size: 2.2rem;
      line-height: 1.4;
      font-weight: 800;
      padding-bottom: $gap * 0.5;

      @include until($desktop) {
        font-size: 1.8rem;
      }
    }
  }

  .image {
    width: 440px;
    max-width: 100%;
    max-height: calc(90vh - $gap);
    padding: $gap * 0.5 0;
    display: flex;
    align-items: center;
    justify-content: center;

    >a {
      display: block;
      height: 100%;
    }

    img {
      max-width: 100%;
      height: auto;
      width: auto;
      max-height: 100%;
    }
  }

  .nav {
    display: flex;
    position: absolute;
    bottom: 0;
    right: calc(50vw - #{($mainSize * 0.5) + $navSize + $navMargin});

    >li {
      display: flex;
      background-color: $black;
      color: $white;
      height: $navMargin + 15px;
      width: $navMargin;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        background-color: $orange;
      }

      &.is-disabled {
        cursor: default;
        background-color: $black-transparent-20;

        &:hover {
          background-color: $black-transparent-20;
        }
      }
    }
  }

  @include until($desktop) {
    min-height: calc(100vh - #{$navMargin});

    .frame {
      flex-direction: column-reverse;
      padding: 0 $gap * 0.5;
    }

    .content {
      width: 100%;
      font-size: 0.8rem;
      padding-top: 0;

      .title {
        font-size: 1.4rem;
        line-height: 1.4;
        padding-bottom: 8px;
      }
    }

    .image {
      padding-top: 10px;
    }

    .nav {
      top: 0;
      right: 0;
    }
  }
}
</style>