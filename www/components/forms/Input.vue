<template>
  <input :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" type="text"
    :placeholder="placeholder" class="input" />
</template>
<script lang="ts" setup>
defineEmits(['update:modelValue'])

const {
  placeholder,
  modelValue
} = defineProps<{
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
}
</style>