<template>
  <div class="datepicker">
    <client-only>
      <datepicker calendar-class="calender" :format="`yyyy-MM-dd`" :value="props.modelValue" :language="ja"
        @input="update" />
    </client-only>
  </div>
</template>
<script lang="ts" setup>
import { ja } from 'vuejs-datepicker/dist/locale';

const props = defineProps<{
  modelValue: Date,
}>();

const emits = defineEmits(['input']);

// const today = computed(() => new Date());
const update = (val: any) => emits('input', val);
</script>
<style lang="scss" scoped>
:deep(.vdp-datepicker) {
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