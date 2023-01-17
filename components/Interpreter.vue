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
          <button @click="() => deletePatch(index)">Delete Patch</button>
      </li>
      <button @click="addPatch">Add Patch</button>
    </div>
    <div>
      Instructions: <input v-model="instructions">
    </div>
    <button @click="getCleaningSummary">Get cleaning summary</button>
    <Display
        :dimensions="gridSize"
        :initRobotPos="robot"
        :patches="patches"
        :steps="steps"
        :finalCoords="finalCoords"
    />
    {{finalCoords.x ? `Final coords: (${finalCoords.x}, ${finalCoords.y})` : ""}}
    <br />
    {{finalCoords.x ? `Cleaned patches: ${cleanedPatches}` : ""}}
  </div>
</template>

<script>
import InstructionInterpreter from '../services/instruction-interpreter'

export default {
  name: 'Interpreter',
  data() {
    return {
      gridSize: {x: 5, y: 5},
      robot: {x: 0, y: 0},
      instructions: "",
      patches: [],
      steps: {},
      finalCoords: {},
      cleanedPatches: 0
    };
  },
  watch: {
    gridSize: {
        handler() {
          this.steps = {};
          this.finalCoords = {};
        },
        deep: true
    },
    robot: {
      handler() {
        this.steps = {};
        this.finalCoords = {};
      },
      deep: true
    },
    instructions: {
      handler() {
        this.steps = {};
        this.finalCoords = {};
      },
      deep: true
    },
    patches: {
      handler() {
        this.steps = {};
        this.finalCoords = {};
      },
      deep: true
    }
  },
  methods: {
    getCleaningSummary() {
      let interpreter = new InstructionInterpreter(this.xSize, this.ySize);
      let result = interpreter.getCleaningSummary(this.robot, this.patches, this.instructions);
      this.steps = result.steps;
      this.finalCoords = result.coords;
      this.cleanedPatches = result.patches;
      console.log(result);
    },

    addPatch() {
      this.patches.push({x: 0, y: 0});
    },

    deletePatch(index) {
      this.patches.splice(index, 1);
    }
  }
}
</script>

