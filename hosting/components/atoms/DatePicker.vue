<template>
  <div class="datepicker">
    <client-only>
      <Datepicker
        calendar-class="calender"
        :format="`yyyy-MM-dd`"
        :value="value"
        :language="ja"
        @input="update"
      />
    </client-only>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { ja } from 'vuejs-datepicker/dist/locale'
export default Vue.extend({
  props: {
    value: {
      type: Date,
      default: new Date(),
    },
  },
  data() {
    return {
      ja,
    }
  },
  computed: {
    today(): Date {
      return new Date()
    },
  },
  methods: {
    update(val: any) {
      this.$emit('input', val)
    },
  },
})
</script>
<style lang="scss" scoped>
/deep/ .vdp-datepicker {
  .vdp-datepicker__calendar {
    bottom: 30px;
    left: -125px;
    border: 2px solid $black;
    .cell {
      &.selected {
        background-color: $black;
        color: $white;
      }
      &:not(.blank):not(.disabled) {
        &.day:hover,
        &.month:hover,
        &.year:hover {
          border: 1px solid $orange;
          color: $orange;
        }
      }
    }
  }
}
</style>