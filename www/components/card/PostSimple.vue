<template>
  <div v-if="post" class="item" :class="{ 'has-image': post.hasThumbnail }">
    <div class="body">
      <h3 class="title">
        <nuxt-link :to="post.permalink">
          {{ title }}
        </nuxt-link>
      </h3>
      <p class="date">{{ post.publishedDate.format('YYYY-MM-DD HH:mm') }}</p>
      <nuxt-link v-if="post.hasThumbnail" :to="post.permalink" class="image sponly">
        <AtomThumbnail :image="post.thumbnail" />
      </nuxt-link>
      <p class="summary">{{ summary }}</p>
      <!-- <div v-if="post.entities && post.entities.length > 0" class="entities">
        <EntitySimpleList :entities="post.entities" />
      </div> -->
      <!-- <div class="author sponly">
        <UserTip :user="post.owner" :is-dark="isDark" />
      </div> -->
    </div>
    <div class="extra pconly" v-if="post.hasThumbnail">
      <nuxt-link :to="post.permalink">
        <AtomThumbnail :image="post.thumbnail" />
      </nuxt-link>
      <!-- <UserTip v-else :user="post.owner" :is-dark="isDark" /> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useNormalizePost } from '~/composables/normalize/useNormalizePost';
import { Post } from '~/schemas/post';
import { getSummary } from '~~/utils/typography';

const props = defineProps<{
  post: Post;
  isDark?: boolean;
}>();
const { post, title } = useNormalizePost(props.post);

const summary = computed(() => post.value?.content ? getSummary(post.value.content) : '');

</script>
<style lang="scss" scoped>
.item {
  border-bottom: 1px solid $black-transparent-30;

  .body {
    display: block;
    width: 100%;
    padding: $gap - 5px 0 $gap 0;

    .title {
      font-size: 1.9rem;
      font-weight: 800;
      line-height: 1.4;
    }

    .date {
      font-size: 0.9rem;
      color: $black-transparent-30;
    }

    .summary {
      padding-top: 6px;
      font-size: 0.9rem;
    }
  }

  .extra {
    width: 180px;
    padding: $gap - 5px 0;
  }

  .entities {
    padding-top: 10px;
  }

  &.has-image {
    display: flex;
    align-items: center;

    .body {
      width: calc(100% - 180px);
    }
  }

  @include until-desktop {
    padding: 0 $gap * 0.5;
    margin-bottom: $gap;
    flex-direction: column-reverse;
    border-bottom: none;

    .body {
      padding: $gap * 0.5 0 0;
      width: 100%;

      .title {
        font-size: 1.4rem;
        line-height: 1.3;
        padding-right: 0;
      }

      .date {
        font-size: 0.9rem;
        color: $gray-black;
        margin-bottom: 10px;
      }

      .image {
        margin-bottom: 12px;
      }
    }

    .extra {
      width: 100%;
      padding: $gap * 0.5 0;
    }

    &.has-image {
      display: flex;
      align-items: center;

      .body {
        width: 100%;
      }
    }
  }
}

.has-margin {
  >li {
    padding-left: $gap;
    padding-right: $gap;
  }

  &.is-small {
    >li {
      padding: 0 $gap * 0.5;
    }
  }
}

.is-small {
  >li {
    .body {
      padding: $gap * 0.5 0;
    }

    .title {
      font-size: 1.4rem;
    }

    .summary {
      font-size: 0.8rem;
    }

    .date {
      font-size: 0.8rem;
    }

    @include until-desktop {
      padding: 0 $gap * 0.5;

      .body {
        padding: $gap * 0.5 0 0;
        width: 100%;

        .title {
          font-size: 1.4rem;
          line-height: 1.3;
          padding-right: 0;
        }
      }

      .user {
        width: 100%;
        padding: 0 0 $gap * 0.5;
      }
    }
  }
}

.is-dark {
  >li {
    border-bottom: 1px solid $black;

    .date {
      color: $black;
    }
  }
}
</style>