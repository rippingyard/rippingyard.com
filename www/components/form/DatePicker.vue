<template>
  <div class="datepicker">
    <client-only>
      <Datepicker v-model="date" calendar-class="calender" :format="`yyyy-MM-dd hh:mm`" locale="ja" :format-locale="ja"
        :hide-input-icon="true" select-text="決定" cancel-text="閉じる" @update:modelValue="update">
        <template #dp-input="{ value }">
          {{ value }}
        </template>
        <template #clear-icon="{}" />
      </Datepicker>
    </client-only>
  </div>
</template>
<script lang="ts" setup>
import Datepicker from '@vuepic/vue-datepicker';
import { ja } from 'date-fns/locale';

const props = defineProps<{
  modelValue: Date,
}>();

const date = ref(props.modelValue || new Date);

const emits = defineEmits(['update:modelValue']);

// const today = computed(() => new Date());
const update = (val: any) => {
  console.log('update!', val);
  emits('update:modelValue', val);
};
</script>
<style lang="scss" scoped>
:deep(.dp__input_wrap) {
  cursor: pointer;
}

:deep(.dp__inner_nav) {
  border-radius: 0;
}
</style>