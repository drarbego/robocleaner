<template>
  <div>
    Room Dimensions
    X: <input v-model="x_size">
    Y: <input v-model="y_size">
    <button @click="findPath">Find Path</button>
  </div>
</template>

<script>
export default {
  name: 'Controls',
  data() {
    return {
      x_size: 0,
      y_size: 0
    };
  },
  methods: {
    findPath() {
      console.log(`${this.x_size}, ${this.y_size}`);
    }
  }
}
</script>

