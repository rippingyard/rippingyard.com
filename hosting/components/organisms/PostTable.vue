<template>
  <table class="table">
    <tr>
      <th></th>
      <th>タイトル</th>
      <th>公開状態</th>
      <th>公開日</th>
    </tr>
    <tr v-for="datum in data" :key="datum.id">
      <td>
        <input
          type="checkbox"
          name="id"
          :value="datum.id"
          class="checkbox"
          @change="check(datum.id)"
        />
      </td>
      <td class="title">
        <nuxt-link :to="editLink(datum)">
          <strong>{{ title(datum.content) }}</strong>
        </nuxt-link>
        <nuxt-link target="_blank" :to="permalink(datum.id)">
          <fa-icon icon="external-link-alt" class="icon" />
        </nuxt-link>
      </td>
      <td>
        <span class="badge" :class="statusClass(datum.status, datum.isPublic)">{{ status(datum.status, datum.isPublic) }}</span>
      </td>
      <td>{{ datum.publishedAt }}</td>
    </tr>
  </table>
</template>
<script lang="ts">
import Vue from 'vue'
import { permalink, editlink, getStatusLabel } from '~/services/post'
import { getTitle } from '~/plugins/typography'
import { Post } from '~/types/post'

export default Vue.extend({
  props: {
    data: {
      default: () => {},
      type: Array,
    },
    check: {
      default: (id: any) => id,
      type: Function,
    },
  },
  methods: {
    title: (content: string) => getTitle(content),
    editLink: (post: Post) => editlink(post.id),
    permalink: (id: string) => permalink(id),
    status: (status: string, isPublic: boolean) => getStatusLabel(status, isPublic),
    statusClass(status: string, isPublic: boolean): string {
      if (isPublic) return 'is-warning'
      if (status === 'draft') return 'is-draft'
      return ''
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
    .icon {
      font-size: 1rem;
    }
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
.checkbox {
  visibility: hidden;
  &::before {
    content: '';
    visibility: visible;
    border-radius: 0;
    border: 2px solid $black;
    width: 1.2rem;
    height: 1.2rem;
    display: block;
    box-shadow: 0 0 0 1px $white inset;
    // transition: all 100ms 0s ease-out;
  }
  &:hover::before {
    cursor: pointer;
    // background-color: $yellow;
  }
  &:checked::before {
    background-color: $black;
  }
  &:hover:checked::before {
    cursor: pointer;
    // background-color: $gray-black;
  }
}
</style>
