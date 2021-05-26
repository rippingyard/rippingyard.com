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
      v-for="(entity, index) in entities"
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
    defaultEntities: {
      type: Array,
      default: () => []
    },
  },
  data(): {
    entities: string[]
    input: string
    isComposing: boolean
  } {
    return {
      entities: [],
      input: '',
      isComposing: false,
    }
  },
  mounted() {
    this.$data.entities = this.defaultEntities
  },
  methods: {
    addEntity() {
      if (!this.isComposing) {
        this.entities.push(this.input)
        this.input = ''
        this.$emit("updateEntities", this.entities)
      }
    },
    removeEntity(index: number) {
      this.entities.splice(index, 1)
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
      > input {
        min-width: 195px;
        border: none;
      }
      &:hover {
        background-color: $white;
      }
    }
  }
}
</style>