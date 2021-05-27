<template>
  <div class="wrapper">
    <ul v-if="activities.length > 0" class="main">
      <li
        v-for="activity in activities"
        :key="activity.id"
      >
        <nuxt-link :to="activityLink(activity)" class="inner" target="_blank">
          <p class="title"><strong>{{ activityMessage(activity) }}</strong></p>
          <div class="content" v-html="activityContent(activity)"></div>
          <p class="footer">{{ formatDate(activity.createdAt) }}</p>
        </nuxt-link>
      </li>
    </ul>
    <div v-else class="empty">
      <p>まだ履歴はありません</p>
    </div>
  </div>
</template>
<script lang="ts">
import dayjs from 'dayjs'
import Vue from 'vue'
import { activityMessage, activityContent, activityLink } from '~/services/activity'
import { Activity } from '~/types/activity'
export default Vue.extend({
  props: {
    activities: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    activityMessage(activity: Activity): string {
      return activityMessage(activity)
    },
    activityContent(activity: Partial<Activity>) {
      return activityContent(activity)
    },
    activityLink(activity: Partial<Activity>) {
      return activityLink(activity)
    },
    formatDate(date: any) {
      return dayjs(date.toDate()).format('YYYY-MM-DD HH:mm')
    },
  }
})
</script>
<style lang="scss" scoped>
.main {
  > li {
    margin-bottom: 25px;
    .inner {
      display: block;
      border: 2px solid $black;
      position: relative;
      padding: $gap;
    }
    .title {
      font-size: 0.8rem;
      margin-bottom: 5px;
      position: absolute;
      top: -12px;
      left: $gap;
      > strong {
        display: inline-block;
        padding: 2px 7px;
        border-radius: 5px;
        color: $white;
        background-color: $black;
      }
    }
    .content {
      font-size: 1.2rem;
    }
    .footer {
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
