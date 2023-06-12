<template>
  <main v-if="post">
    <BlockHeading>
      <h1>{{ title }}</h1>
    </BlockHeading>
    <article class="post">
      <!-- <div v-if="post.parent" class="parent">
        <ItemCard :item="post.parent" />
      </div> -->
      <BlockWysiwyg :content="content" :is-article="true" />
      <AdPostBottom />
      <p>{{ p }}</p>
      <!-- <div v-if="post.parent" class="parent">
        <ItemWidget v-if="post.parent.parentType === 'item'" :item="post.parent" />
      </div> -->
      <!-- <div v-if="post.owner" class="owner">
        <UserCard :user="post.owner" />
      </div> -->
      <!-- <CommentList :parent-id="parentId" /> -->
      <!-- <CommentForm :parent-id="parentId" :is-public="post.isPublic" /> -->
      <!-- <div v-if="post.entities" class="entities">
        <EntitySimpleList :entities="post.entities" />
      </div> -->
      <ul class="footer">
        <li class="date">
          <IconClock />{{ post.publishedDate.format('YYYY-MM-DD HH:mm') }}
        </li>
        <li v-if="props.post.owner">
          <CardUserLink :userRef="props.post.owner" />
        </li>
        <li>
          <AtomEditPostLink :post="props.post" />
        </li>
      </ul>
    </article>
    <!-- <div class="block sub sticky">
      <div class="block">
        <div v-if="post.owner" class="owner">
          <UserTip :user="post.owner" />
        </div>
        <div class="social">
          <button class="button twitter is-wide" @click="openTweetForm">
            <fa-icon :icon="['fab', 'twitter']" class="icon" />ツイートする
          </button>
        </div>
      </div>
    </div> -->
    <!-- <div class="block">
      <div v-if="post.items.length > 0" class="items">
        <ul>
          <li v-for="item of post.items" :key="item.id">
            <ItemCard :item="item" />
          </li>
        </ul>
      </div>
      <aside class="extra related">
        <div class="heading">
          <h2><span class="border">関連記事</span></h2>
        </div>
        <RelatedArticles :tags="entities" :exclude-id="post.id" />
      </aside>
    </div> -->
    <!-- <Links :links="links" /> -->
  </main>
</template>
<script lang="ts" setup>
import { useNormalizePost } from '~/composables/normalize/useNormalizePost';
import { Post, OriginalPost } from '~/schemas/post';
import { getTitle } from '~/utils/typography';
import { useContentFilter } from '~~/composables/filter/useContentFilter';

const props = defineProps<{
  post: OriginalPost;
}>();
const { post, title, p } = useNormalizePost(props.post);
const content = useContentFilter(post?.value?.contentBody || '');

watch(post, () => {
  console.log('post changed', post);
});

// const title = computed(() => post?.value?.title);
// const title = computed(() => post.value && post.value.content ? getTitle(post.value) : '');
// const summary = computed(() => post.value.contentOriginal ? getSummary(post.value.contentOriginal) : '');

</script>
<style lang="scss" scoped>
.heading {
  margin-bottom: $gap;

  h1 {
    font-size: 2.2rem;
    line-height: 1.4;
    font-weight: 800;
    padding-top: 3rem;
  }

  h2 {
    font-size: 1.4rem;
    line-height: 1.4;
    font-weight: 800;
    padding-top: 2.2rem;
  }

  h1,
  h2 {
    .border {
      display: inline-block;
      padding-bottom: 2px;
      border-bottom: 4px solid $black;
    }
  }

  .extra & {
    margin-bottom: $gap * 0.5;
  }

  @include until($desktop) {
    max-width: $mainSize;
    padding: 0 ($gap * 0.5);
    margin: 0 auto $gap * 0.5;

    h1 {
      padding-top: $gap * 0.5;
      font-size: 1.8rem;
    }
  }
}

.parent {
  margin: 0 0 $gap * 0.5;

  @include until($desktop) {
    margin: 0 $gap * 0.5 $gap * 0.5;
  }
}

.items {
  margin-bottom: 25px;
}

.entities {
  margin-bottom: 30px;

  @include until($desktop) {
    padding: 0 $gap * 0.5;
  }
}

.footer {
  padding-top: $gap * 2;
  font-size: 0.9rem;
  color: $gray-black;
  font-weight: 800;
  position: relative;
  margin-bottom: $gap;

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
    background-color: $gray-black;
    top: 70px;
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

.extra {
  padding-top: $gap;
}

.owner {
  border-bottom: 1px solid $gray-black;
  padding-bottom: $gap * 0.5;
  margin-bottom: $gap * 0.5;

  .avatar {
    display: block;
    margin: 0 auto 10px;
    width: 80px;
    height: 80px;
    border-radius: 999999px;
    border: 4px solid $black;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .name {
    text-align: center;
    font-weight: 800;
    font-size: 1.2rem;
    line-height: 1.2;
  }

  .account {
    text-align: center;
    font-weight: 400;
    font-size: 0.8rem;
    color: $gray-black;
  }
}

.social {
  .button {
    text-align: center;
    padding: 10px 0;
    border: 0;
    color: $white;
    font-weight: 800;
    font-size: 0.9rem;

    .icon {
      margin-right: 5px;
    }
  }
}
</style>