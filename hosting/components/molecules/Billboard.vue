<template>
  <section class="billboard" :class="className">
    <div class="frame no-header">
      <div class="content">
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
        <img :src="thumbnail" />
      </div>
    </div>
    <ul class="nav">
      <li v-if="index > 0" @click="go(-1)">
        <fa-icon icon="angle-left" class="icon" />
      </li>
      <li v-else class="is-disabled">
        <fa-icon icon="angle-left" class="icon" />
      </li>
      <li v-if="index + 1 < posts.length" @click="go(1)">
        <fa-icon icon="angle-right" class="icon" />
      </li>
      <li v-else class="is-disabled">
        <fa-icon icon="angle-right" class="icon" />
      </li>
    </ul>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import { Post } from '~/types/post'
import { getSummary, getTitle, hasTitle } from '~/plugins/typography'
import { numberByString } from '~/plugins/util'
import { getThumbnail, hasThumbnail, permalink } from '~/services/post'

type PostType = Post & {
  parent?: Post
}

type DataType = {
  post?: PostType
  index: number
}

export default Vue.extend({
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
  data(): DataType {
    return {
      post: undefined,
      index: 0,
    }
  },
  computed: {
    hasTitle(): boolean {
      return this.post ? hasTitle(this.post.content) : false
    },
    hasParentTitle(): boolean {
      return this.post ? !!this.post.parent : false
    },
    hasThumbnail(): boolean {
      return this.post ? hasThumbnail(this.post) : false
    },
    title(): string {
      if (!this.post) return ''
      if (this.hasTitle) return getTitle(this.post.content)
      if (this.hasParentTitle) return this.post.parent?.name.ja
      return getTitle(this.post.content)
    },
    summary(): string {
      if (!this.post) return ''
      return getSummary(
        this.post.content,
        !this.hasTitle && !this.hasParentTitle ? 240 : 160
      )
    },
    thumbnail(): string {
      return this.post ? getThumbnail(this.post) : ''
    },
    permalink(): string {
      return this.post ? permalink(this.post.id) : ''
    },
    className(): string {
      return this.post ? `bgcolor-${numberByString(this.post.id) % 4}` : ''
    },
  },
  mounted() {
    this.go(Math.round(Math.random() * (this.posts.length - 1)))
  },
  methods: {
    go(step: number): void {
      if (this.posts.length === 0) return
      this.index += step
      console.log('this.index', this.index)
      this.post = this.posts[this.index] as PostType
    },
  },
})
</script>
<style lang="scss" scoped>
.billboard {
  display: flex;
  position: relative;
  align-items: center;
  padding-top: $navMargin;
  min-height: 100vh;
  margin-bottom: $gap / 2;

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
    padding: $gap / 2 0;
    display: flex;
    align-items: center;
    .title {
      font-size: 2.2rem;
      line-height: 1.4;
      font-weight: 800;
      padding-bottom: $gap / 2;
      @include until($desktop) {
        font-size: 1.8rem;
      }
    }
  }

  .image {
    width: 440px;
    max-width: 100%;
    padding: $gap / 2 0;
    display: flex;
    align-items: center;
    justify-content: center;
    > img {
      max-width: 100%;
      height: auto;
      width: auto;
      max-height: 100vh;
    }
  }

  .nav {
    display: flex;
    position: absolute;
    bottom: 0;
    right: calc(50vw - #{($mainSize / 2) + $navSize + $navMargin});
    > li {
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
      padding: 0 $gap / 2;
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