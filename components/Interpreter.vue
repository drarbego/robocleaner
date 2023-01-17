<template>
  <div>
    <div>
      Room Dimensions
      X: <input v-model.number="gridSize.x" type="number">
      Y: <input v-model.number="gridSize.y" type="number">
    </div>
    <div>
      Robot Position
      X: <input v-model.number="robot.x" type="number">
      Y: <input v-model.number="robot.y" type="number">
    </div>
    <div>
      <li v-for="(patch, index) in patches">
          Patch {{index}}
          X: <input v-model.number="patches[index].x" type="number">
          Y: <input v-model.number="patches[index].y" type="number">
      </li>
      <button @click="addPatch">Add Patch</button>
    </div>
    <div>
      Instructions: <input v-model="instructions">
    </div>
    <button @click="getCleaningSummary">Get cleaning summary</button>
  </div>
</template>

<script>
import InstructionInterpreter from '../services/instruction-interpreter'

export default {
  name: 'Interpreter',
  data() {
    return {
      gridSize: {x: 0, y: 0},
      robot: {x: 0, y: 0},
      instructions: "",
      patches: []
    };
  },
  methods: {
    getCleaningSummary() {
      let interpreter = new InstructionInterpreter(this.xSize, this.ySize);
      let result = interpreter.checkCleanedPatches(this.robot, this.patches, this.instructions);
      console.log(result);
    },

    addPatch() {
      this.patches.push({x: 0, y: 0});
    }
  }
}
</script>

