<template>
  <form>
    <div class="field">
      <label>メールアドレス</label>
      <input
        v-model="email"
        type="email"
        placeholder="メールアドレスを入力"
        class="input"
      />
    </div>
    <div class="console">
      <button class="button">招待する</button>
    </div>
  </form>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      email: '',
    }
  },
})
</script>
<style lang="scss" scoped>
.field {
  margin-bottom: 20px;
  > label {
    display: block;
    font-size: 0.9rem;
    font-weight: 800;
    opacity: 0.8;
  }
  .input {
    width: 100%;
    border-bottom: 1px solid $black;
    font-size: 1.1rem;
    padding: 5px 0;
  }
}
</style>
