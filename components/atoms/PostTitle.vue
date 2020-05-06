<template>
  <h1>{{ title }}</h1>
</template>

<style scoped lang="scss">

h1 {
  font-size: 28px;
  color: $black;
  font-weight: 800;
}

</style>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
