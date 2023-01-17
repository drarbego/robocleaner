<template>
  <div class="grid-container">
      <div v-for="(_j, j) in dimensions.y" class="grid-column">
        <div v-for="(_i, i) in dimensions.x" class="grid-row" :class="{ cleaned: isCleaned(i, j)}">
          {{getEmoji(i, j)}}
        </div>
      </div>
  </div>
</template>

<style>
  .cleaned {
    border: 1px solid red;
    background-color: gray;
  }
  .grid-container {
    display: flex;
    flex-direction: column;
  }

  .grid-column {
    display: flex;
    flex-direction: row;
  }

  .grid-row {
    width: 50px;
    height: 50px;
    border: 1px solid black;
  }

</style>

<script>
// TODO this component should only display the received data
export default {
  name: 'Display',
  props: {
    dimensions: {
      type: Object,
      default() {
        return {x: 0, y: 0};
      }
    },
    initRobotPos: {
      type: Object,
      default() {
        return {x: 0, y: 0};
      }
    },
    finalCoords: {
      type: Object,
      default() {
        return {};
      }
    },
    patches: {
      type: Array,
      required: true
    },
    steps: {
      type: Object,
      required: true
    }
  },
  computed: {
    mappedPatches() {
      return this.patches.reduce(
          (acc, patch) => ({...acc, [`${patch.x}-${patch.y}`]: patch}),
          {}
      );
    }
  },
  methods: {
    getEmoji(i, j) {
      j = this.translateY(j);

      if (i === this.finalCoords.x && j === this.finalCoords.y) return "🤖";
      if (
          !this.finalCoords.x &&
          i === this.initRobotPos.x &&
          j === this.initRobotPos.y
      ) return "🤖";

      let coordKey = `${i}-${j}`;
      if (this.steps[coordKey]) return "🧹";
      if (this.mappedPatches[coordKey]) return "💩";

      return "";
    },

    isCleaned(i, j) {
      j = this.translateY(j);
      if (!Object.keys(this.steps)) return false;
      return Boolean(this.steps[`${i}-${j}`]);
    },
    translateY(y) {
      // the coordinate system starts from the bottom for Y
      // but our render starts from the top, so we have to
      // translate the position when coordinates come from
      // render
      return this.dimensions.y - y - 1;
    }
  }
}
</script>

