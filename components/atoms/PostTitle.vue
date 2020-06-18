<template>
  <h1 v-html="sanitize(title)"></h1>
</template>

<style scoped lang="scss">

h1 {
  font-size: 28px;
  color: $black;
  font-weight: 800;
}

</style>

<script>
import { stripTags } from '~/plugins/typography'

export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    sanitize: str => {
      return stripTags( str )
    }
  }
}
</script>
