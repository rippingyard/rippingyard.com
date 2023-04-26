<template>
  <div v-if="post" class="item">
    <h1 class="title">
      <nuxt-link :to="post.permalink">
        {{ post.title }}
      </nuxt-link>
    </h1>
    <div class="inner" :class="{ columns: post.thumbnail }">
      <div class="content" :class="{ column: post.thumbnail, c80: post.thumbnail }">
        <!-- <div v-if="post.parent" class="parent">
          <ItemCard :item="post.parent" />
        </div> -->
        <div class="summary" v-html="summary" />
      </div>
      <div v-if="post.thumbnail" class="image column c20">
        <nuxt-link :to="post.permalink">
          <img :src="post.thumbnail" />
        </nuxt-link>
      </div>
    </div>
    <!-- <div class="entities">
      <EntitySimpleList :entities="post.entities" />
    </div> -->
    <p class="footer">
      <IconClock />{{ post.publishedDate.format('YYYY-MM-DD HH:mm') }}
    </p>
  </div>
</template>
<script lang="ts" setup>
import { useNormalizePost } from '~/composables/normalize/useNormalizePost';
import { Post } from '~/schemas/post';
import { getSummary } from '~/utils/typography';

const post = ref<Post>();
const props = defineProps<{
  post: Post;
}>();

onMounted(() => {
  post.value = useNormalizePost(props.post);
});

const summary = computed(() => post.value && post.value.contentOriginal ? getSummary(post.value.contentOriginal) : '');

</script>
<style lang="scss" scoped>
.item {
  // padding: $gap;
  margin-bottom: $gap;

  @include until-desktop {
    padding: 0 $gap * 0.5;
  }
}

.title {
  font-size: 1.9rem;
  margin-bottom: 12px;
  font-weight: 800;
  line-height: 1.4;
  padding-right: $gap;

  @include until-desktop {
    font-size: 1.4rem;
    line-height: 1.3;
    padding-right: 0;
  }
}

.parent {
  margin: 0 0 $gap * 0.5;
  padding-right: $gap;

  @include until-desktop {
    margin: 0 0 $gap * 0.5;
  }
}

.image {
  margin-bottom: 25px;
  padding-top: 10px;

  img {
    max-width: 100%;
  }

  @include mobile {
    padding-top: 0;
  }
}

.summary {
  font-size: 0.9rem;
  margin-bottom: 42px;
  padding-right: $gap;

  @include until-desktop {
    padding-right: 0;
    margin-bottom: $gap * 0.5;
  }
}

.entities {
  padding-bottom: 15px;
}

.footer {
  font-size: 0.8rem;
  font-weight: 800;
  color: $gray-black;
  position: relative;
  padding-top: 10px;

  &::before {
    content: '';
    width: 18px;
    height: 1px;
    background-color: $gray-black;
    top: 0;
    left: 0;
    display: block;
    position: absolute;
  }

  .icon {
    margin-right: 5px;
  }
}

a {
  text-decoration: none;

  &:hover {
    color: $orange;
  }
}
</style>