<template>
  <ul>
    <li v-for="option in options">
      <AtomCheckbox :is-checked="isChecked(option.key) || false" :label="option.label" @click="onClick(option.key)" />
    </li>
  </ul>
</template>
<script lang="ts" setup>
const emit = defineEmits(['update:modelValue']);

type Value = {
  key: string;
  label?: string;
}

const props = defineProps<{
  options: Value[],
  modelValue: undefined | string | string[];
}>();
const options = computed<Value[]>(() => props.options || []);
const value = ref<undefined | string | string[]>(props.modelValue);

const isChecked = (key: string) => typeof value.value === 'string' ? value.value === key : value.value?.includes(key);

const onClick = (key: string) => {
  const target = options.value.find(v => v.key === key);
  if (!target) return;

  if (typeof value.value === 'string') {
    value.value = key;
  } else {
    const index = options.value.findIndex(v => v.key == key);
    index > 0 ? value.value?.push(key) : value.value?.splice(index, 1);
  }
  emit('update:modelValue', value.value);
}

watch(options, val => {
  const match = val.find(v => isChecked(v.key));
  if (!match) onClick(options.value[0].key);
})

</script>