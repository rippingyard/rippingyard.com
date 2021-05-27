<template>
  <div class="wrapper">
    <ul v-if="notifications.length > 0" class="main">
      <li
        v-for="notification in notifications"
        :key="notification.id"
      >
        <nuxt-link :to="`/${notification.to}`" target="_blank">
          <div class="image" :style="avatar(notification.image)"></div>
          <div class="content">
            <p v-html="notification.message" />
          </div>
          <p class="footer">{{ formatDate(notification.createdAt) }}</p>
        </nuxt-link>
      </li>
    </ul>
    <div v-else class="empty">
      <p>通知はありません</p>
    </div>
  </div>
</template>
<script lang="ts">
import dayjs from 'dayjs'
import Vue from 'vue'
export default Vue.extend({
  props: {
    notifications: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatDate(date: any) {
      return dayjs(date.toDate()).format('YYYY-MM-DD HH:mm')
    },
    avatar(avatar: string) {
      return `background-image:url(${avatar})`
    },
  }
})
</script>
<style lang="scss" scoped>
.main {
  > li {
    margin-bottom: 12px;
    position: relative;
    .image {
      width: 40px;
      height: 40px;
      border-radius: 29999px;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-size: contain;
      border: 2px solid $black;
      position: absolute;
      top: 0;
      left: 0;
    }
    .title {
      font-size: 0.8rem;
      margin-bottom: 5px;
      padding-left: 50px;
      > strong {
        display: inline-block;
        padding: 2px 7px;
        border-radius: 5px;
        color: $white;
        background-color: $black;
      }
    }
    .content {
      padding-left: 50px;
      font-size: 1.2rem;
    }
    .footer {
      padding-left: 50px;
      font-size: 0.8rem;
      color: $gray-black;
    }
  }
}
.empty {
  border: 1px solid $black;
  padding: $gap * 3 $gap;
  text-align: center;
  font-size: 1rem;
  font-weight: 800;
  background-color: $gray;
}
</style>
