<template>
  <div>
    <div>
      Room Dimensions
      <br />
      X: <input v-model.number="gridSize.x" type="number">
      Y: <input v-model.number="gridSize.y" type="number">
    </div>
    <div>
      Robot Position
      <br />
      X: <input v-model.number="robotStart.x" type="number">
      Y: <input v-model.number="robotStart.y" type="number">
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
    <button @click="findPath">Find path</button>
    <Display
        :dimensions="gridSize"
        :robotStart="robotStart"
        :robotEnd="robotEnd"
        :patches="patches"
        :cleanedCells="steps"
    />
    <div v-if="displaySummary">
      <p>Final robot position {{`(${robotEnd.x}, ${robotEnd.y})`}}</p>
      <p>Total cleaned patches: {{totalCleanedPatches}}</p>
    </div>
  </div>
</template>

<script>
import InstructionInterpreter from '../services/instruction-interpreter'
import PathFinder from '../services/path-finding'

export default {
  name: 'Main',
  data() {
    return {
      gridSize: {x: 5, y: 5},
      robotStart: {x: 0, y: 0},
      robotEnd: {x: -1, y: -1},
      instructions: "",
      patches: [],
      cleanedCells: [],
      steps: [],
      totalCleanedPatches: 0,
      displaySummary: false
    };
  },
  watch: {
    gridSize: {
      handler() {
        this.resetState();
      },
      deep: true
    },
    robotStart: {
      handler() {
        this.resetState();
      },
      deep: true
    }
  },
  methods: {
    getCleaningSummary() {
      let interpreter = new InstructionInterpreter(this.xSize, this.ySize);
      let result = interpreter.getCleaningSummary(this.robotStart, this.patches, this.instructions);
      this.steps = result.steps;
      this.robotEnd = result.coords;
      this.totalCleanedPatches = result.patches;
      this.displaySummary = true;
    },

    findPath() {
      let finder = new PathFinder(this.xSize, this.ySize);
      let result = finder.find(this.robotStart, this.patches);
      this.instructions = result.join("");
    },

    addPatch() {
      this.patches.push({x: 0, y: 0});
    },

    deletePatch(index) {
      this.patches.splice(index, 1);
    },

    resetState() {
      this.robotEnd = {x: -1, y: -1};
      this.instructions = "";
      this.patches = [];
      this.cleanedCells = [];
      this.steps = [];
      this.totalCleanedPatches = 0;
      this.displaySummary = false;
    }
  }
}
</script>

