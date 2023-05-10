<template>
  <div v-if="post" class="item">
    <div class="body">
      <h3 class="title">
        <nuxt-link :to="post.permalink">
          {{ post.title }}
        </nuxt-link>
      </h3>
      <ul class="footer">
        <li class="date">
          <IconClock />{{ post.publishedDate.format('YYYY-MM-DD HH:mm') }}
        </li>
        <!-- <li v-if="props.post.owner">
          <CardUserLink :userRef="props.post.owner" />
        </li> -->
        <li>
          <AtomEditPostLink :post="post" />
        </li>
      </ul>
      <nuxt-link v-if="post.hasThumbnail" :to="post.permalink" class="image sponly">
        <AtomThumbnail :image="post.thumbnail" :is-square="true" />
      </nuxt-link>
      <!-- <p class="summary">{{ summary }}</p> -->
    </div>
    <div class="extra pconly">
      <template v-if="post.hasThumbnail">
        <nuxt-link :to="post.permalink">
          <AtomThumbnail :image="post.thumbnail" size="small" :is-square="true" />
        </nuxt-link>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useNormalizePost } from '~/composables/normalize/useNormalizePost';
import { Post } from '~/schemas/post';
import { getSummary } from '~~/utils/typography';

const post = ref<Post>();
const props = defineProps<{
  post: Post;
  isDark?: boolean;
}>();

onMounted(() => {
  post.value = useNormalizePost(props.post);
});

const summary = computed(() => post.value?.content ? getSummary(post.value.content) : '');

</script>
<style lang="scss" scoped>
.item {
  display: flex;
  border-bottom: 1px solid $black-transparent-30;

  .body {
    display: block;
    width: calc(100% - 40px);
    padding: $gap * 0.5 - 5px $gap * 0.5 $gap * 0.5 $gap * 0.5;
    flex-shrink: 1;
    flex-grow: 0;

    .title {
      font-size: 1.9rem;
      font-weight: 800;
      line-height: 1.4;
    }

    // .date {
    //   font-size: 0.9rem;
    //   color: $black-transparent-30;
    // }

    .summary {
      padding-top: 6px;
      font-size: 0.9rem;
    }
  }

  .extra {
    width: 60px;
    flex-shrink: 1;
    flex-grow: 0;
    padding: $gap * 0.5;
  }

  .footer {
    padding-top: 24px;
    font-size: 0.9rem;
    color: $black-transparent-30;
    font-weight: 800;
    position: relative;
    margin-bottom: 0;

    >li {
      margin-right: $gap;
      display: inline-block;

      .icon {
        margin-right: 5px;
      }
    }

    &::before {
      content: '';
      width: 18px;
      height: 1px;
      background-color: $black-transparent-30;
      top: 12px;
      left: 0;
      display: block;
      position: absolute;
    }

    >p {
      display: inline-block;

      .icon {
        margin-right: 5px;
      }
    }

    @include until($desktop) {
      padding-left: $gap * 0.5;
      padding-right: $gap * 0.5;

      &::before {
        left: $gap * 0.5;
      }
    }
  }

  .entities {
    padding-top: 10px;
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