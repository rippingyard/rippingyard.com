﻿<template>
  <BlockLoading :is-loading="pending" :error="error">
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

const props = defineProps<{
  excludeId?: string;
}>();

const index = ref(0);
const { data, pending, error } = usePosts({
  where: [
    { key: 'type', val: ['article'] },
  ],
  limit: 25,
  orderBy: { key: 'publishedAt', order: 'desc' }
});
const posts = computed<OriginalPost[]>(() => data.value?.filter(p => p.id !== props.excludeId) || []);
const post = computed<OriginalPost | undefined>(() => {
  if (posts.value.length === 0 || !posts.value[index.value]) return;
  return posts.value[index.value];
});

const hasParentTitle = computed((): boolean => post.value ? !!post.value.parent : false);
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

      @include until($desktop) {
        width: calc(100% - 80px);
      }
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
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    height: 100vh;
    overflow: hidden;

    .frame {
      // display: block;
      padding: 0 $gap * 0.5;
      overflow: initial;
      height: initial;
      max-height: 100%;
      flex-direction: column;
    }

    .content {
      width: calc(100% - 80px);
      margin: auto;
      max-width: calc($mainSize - 80px);
      font-size: 0.8rem;
      padding-top: 20px;

      .title {
        font-size: 1.4rem;
        line-height: 1.4;
        padding-bottom: 8px;
      }
    }

    .image {
      // padding-top: 10px;
      padding: 0;
      width: calc(100% - 80px);
      margin: auto;
      max-width: $mainSize;
      max-height: initial;
      // flex-shrink: 3;
      min-height: 0;
      overflow: hidden;

      >a {
        // display: block;
        display: flex;

        // max-width: 100%;
        // max-height: 100%;
        >img {
          display: block;
          min-height: 0;
        }
      }
    }

    .nav {
      position: absolute;
      display: block;
      top: 0;
      right: 0;
      width: 100%;
      height: 0;
      // justify-content: space-between;

      >li {
        // height: 100%;
        width: 40px;
        position: absolute;
        top: calc(50vh - 10vh);
        height: 20vh;

        &:first-child {
          left: 0
        }

        &:last-child {
          right: 0;
        }
      }
    }
  }
}
</style>