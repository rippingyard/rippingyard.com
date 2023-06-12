<template>
  <div :class="classes">
    <div class="box" />
    <div class="box" />
    <div class="box" />
  </div>
</template>
<script lang="ts" setup>

const props = defineProps<{
  isBlack?: boolean;
}>();

const classes = {
  black: props.isBlack || false,
}

</script>
<style lang="scss" scoped>
.box {
  width: 5px;
  height: 7px;
  bottom: 4px;
  position: absolute;

  &:nth-of-type(1) {
    right: 30px;
    background-color: $yellow;
  }

  &:nth-of-type(2) {
    right: 35px;
    background-color: $blue;
  }

  &:nth-of-type(3) {
    right: 40px;
    background-color: $orange;
  }

  .black>& {
    background-color: $black;
  }
}
</style>