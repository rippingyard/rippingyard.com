<template>
  <ul class="entities">
    <li class="input">
      <input
        v-model="input"
        type="text"
        placeholder="キーワードを入力してください"
        @keydown.enter="addEntity"
        @compositionstart="startComposing"
        @compositionend="stopComposing"
      >
    </li>
    <li
      v-for="(entity, index) in post.entities"
      :key="index"
      @click="removeEntity(index)"
    >{{ decodeEntity(entity) }}</li>
  </ul>
</template>
<script lang="ts">
import Vue from 'vue'
import { decodeEntity } from '~/services/entity'
export default Vue.extend({
  props: {
    post: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {
      input: '',
      isComposing: false,
    }
  },
  methods: {
    addEntity() {
      if (!this.isComposing) {
        if (!this.post.entities || this.post.entities.byUser) this.post.entities = []
        this.post.entities.push(this.input)
        this.input = ''
      }
    },
    removeEntity(index: number) {
      this.post.entities.splice(index, 1)
    },
    startComposing(): void {
      this.isComposing = true
    },
    stopComposing(): void {
      this.isComposing = false
    },
    decodeEntity(entity: string) {
      return decodeEntity(entity)
    }
  }
})
</script>
<style lang="scss" scoped>
.entities {
  > li {
    display: inline-block;
    padding: 3px 12px;
    border: 2px solid $black;
    border-radius: 20000px;
    margin-right: 5px;
    &:hover {
      cursor: pointer;
      background-color: $yellow;
    }
    &.input {
      min-width: 195px;
      &:hover {
        background-color: $white;
      }
    }
  }
}
</style>