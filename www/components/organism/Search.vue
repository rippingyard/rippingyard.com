<template>
  <div class="search">
    <div class="input">
      <IconSearch class="icon" />
      <input v-model="query" type="text" placeholder="検索ワードを入力する" @keydown.enter="doSearch"
        @compositionstart="startComposing" @compositionend="stopComposing" />
      <button v-if="query.length > 0" class="submit" @click="doSearch">
        SEARCH
      </button>
    </div>
    <div v-if="!isEmpty" class="result">
      <ul class="hits">
        <li class="hit">
          <nuxt-link v-for="hit in hits" :to="permalink(hit)">
            <h2 class="title">{{ hit.title }}</h2>
            <div class="content" v-html="summary(hit.content)" />
            <p class="date">{{ formatDate(hit.publishedAt) }}</p>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div v-else class="empty">
      <p class="result">検索結果はありません</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';

const { result, search } = useAlgoliaSearch('posts');

const query = ref('');
const isComposing = ref(false);
const isEmpty = computed(() => query.value === '' || hits.value.length === 0);

const doSearch = async () => {
  if (isComposing.value) return;
  await search({ query: query.value });
}

const hits = computed(() => result?.value?.hits || []);

const permalink = (hit: any): string => `/post/${hit.objectID}`;
const summary = (content: string): string => getSummary(content, 300);
const formatDate = (time: number): string => dayjs(time * 1000).format('YYYY-MM-DD HH:mm');
const startComposing = () => {
  console.log('startComposing');
  isComposing.value = true;
}
const stopComposing = () => {
  console.log('stopComposing');
  isComposing.value = false;
}

</script>
<style lang="scss" scoped>
.search {
  // background-color: $black;
  height: 100%;

  .input {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid $black;
    padding: 22px 18px;
    font-size: 2.8rem;
    font-weight: 800;
    line-height: 1;

    >.icon {
      margin-right: 14px;
      font-size: 2.2rem;
    }

    >input {
      border: none;
      width: 100%;
    }

    >.submit {
      padding: 8px 14px;
      background-color: $black;
      color: $yellow;
      border-radius: 100px;
      font-size: 1.4rem;

      &:hover {
        background-color: $gray-black;
      }
    }
  }

  .result {
    .hits {
      &>.hit {
        .title {
          font-size: 1.4rem;
          font-weight: 800;
          margin-bottom: 5px;
        }

        .content {
          font-size: 0.8rem;
          opacity: 0.9;
          margin-bottom: 12px;
        }

        .date {
          font-size: 0.8rem;
        }

        &>a {
          display: block;
          padding: $gap * 0.5;
          border-bottom: 1px solid $black;
          cursor: pointer;

          &:hover {
            background-color: $black;
            color: $yellow;
          }
        }
      }
    }
  }

  .empty {
    padding: 20px;

    .result {
      font-size: 1.2rem;
    }
  }

  @include until-desktop {
    .input {
      .ais-SearchBox {
        font-size: 1.4rem;

        >.icon {
          font-size: 2rem;
        }

        >.submit {
          font-size: 1.1rem;
          padding: 5px 10px;
        }
      }
    }
  }
}
</style>