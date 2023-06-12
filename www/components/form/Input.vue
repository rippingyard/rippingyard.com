<template>
  <input type="text" class="input" :value="props.modelValue" :placeholder="props.placeholder"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
</template>
<script lang="ts" setup>
defineEmits(['update:modelValue']);

const props = defineProps<{
  placeholder?: string
  modelValue: string
}>();
</script>
<style lang="scss" scoped>
.input {
  width: 100%;
  border-bottom: 1px solid $black;
  font-size: 1.1rem;
  padding: 5px 0;
  outline: none;
}
</style>