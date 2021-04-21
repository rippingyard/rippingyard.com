<template>
  <div>
    <h2>Entities</h2>
    <div>
      <input v-model="input" type="text" @keyup.enter="addEntity">
      <ul class="entities">
        <li v-for="(entity, index) in post.entities" :key="index" @click="removeEntity(index)">{{ entity }}</li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
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
    }
  },
  methods: {
    addEntity() {
      if (!this.post.entities || this.post.entities.byUser) this.post.entities = []
      this.post.entities.push(this.input)
      this.input = ''
    },
    removeEntity(index: number) {
      this.post.entities.splice(index, 1)
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
  }
}
</style>