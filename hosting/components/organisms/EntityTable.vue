<template>
  <table class="table">
    <tr>
      <th>ラベル</th>
      <th>公開日</th>
    </tr>
    <tr v-for="datum in data" :key="datum.id">
      <td class="title">
        <nuxt-link :to="editLink(datum)">
          <strong>{{ title(datum.content) }}</strong>
        </nuxt-link>
      </td>
      <td>{{ datum.publishedAt }}</td>
    </tr>
  </table>
</template>
<script lang="ts">
import Vue from 'vue'
import { getTitle } from '~/plugins/typography'
import { Post } from '~/types/post'

export default Vue.extend({
  props: {
    data: {
      default: () => {},
      type: Array,
    },
  },
  methods: {
    title: (content: string) => getTitle(content),
    editLink: (post: Post) => `/home/post/edit/${post.id}`,
    status: (status: string) => {
      switch (status) {
        case 'published':
          return '公開中'
        case 'draft':
          return '下書き'
        default:
          return status
      }
    },
  },
})
</script>
<style lang="scss" scoped>
table {
  width: 100%;
  border-top: 2px solid $black;
  border-bottom: 1px solid $black;
}
th,
td {
  padding: 15px;
}
th {
  border-bottom: 1px solid $black;
}
td {
  border-bottom: 1px solid $gray;
  &.title {
    font-size: 1.2rem;
  }
  a {
    &:hover {
      text-decoration: underline;
    }
  }
}
tr {
  &:hover {
    td {
      background-color: $gray;
    }
  }
  &:last-child {
    td {
      border: none;
    }
  }
}
</style>
