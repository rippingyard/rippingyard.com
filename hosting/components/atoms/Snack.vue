<template>
  <div
    class="snack"
    :class="{ isOpen: isOpen(), isDanger: type() === 'danger' }"
    @click="close"
  >
    <p>{{ message() }}</p>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
  data() {
    return {
      ...mapGetters({
        isOpen: 'snack/isOpen',
        type: 'snack/type',
        message: 'snack/message',
      }),
    }
  },
  methods: {
    ...mapMutations({
      open: 'snack/open',
      close: 'snack/close',
    }),
  },
})
</script>
<style lang="scss" scoped>
.snack {
  width: 480px;
  position: fixed;
  bottom: -70px;
  right: 30px;
  opacity: 0;
  background: $black;
  color: $white;
  border-radius: 6px;
  padding: 16px 20px;
  transition: 0.14s ease-out;
  &.isOpen {
    bottom: 30px;
    opacity: 1;
  }
  &.isDanger {
    background: $orange;
  }
}
</style>
