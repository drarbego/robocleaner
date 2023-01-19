<template>
  <div class="grid-container">
      <div v-for="(_j, j) in dimensions.y" class="grid-column">
        <div v-for="(_i, i) in dimensions.x" class="grid-row" :class="{ cleaned: getEmoji(i, j) == '🧹'}">
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
export default {
  name: 'Display',
  props: {
    dimensions: {
      type: Object,
      default() {
        return {x: 0, y: 0};
      }
    },
    robotStart: {
      type: Object,
      default() {
        return {x: 0, y: 0};
      }
    },
    robotEnd: {
      type: Object,
      default() {
        return {x: 0, y: 0};
      }
    },
    patches: {
      type: Array,
      required: true
    },
    cleanedCells: {
      type: Array,
      required: true
    }
  },
  computed: {
    mappedCellContent() {
      let cellContent = {};
      cellContent = this.patches.reduce(
          (acc, patch) => ({...acc, [this.getKey(patch.x, patch.y)]: "💩"}),
          cellContent
      );
      cellContent = this.cleanedCells.reduce(
          (acc, cell) => ({...acc, [this.getKey(cell.x, cell.y)]: "🧹"}),
          cellContent
      );
      cellContent[this.getKey(this.robotEnd.x, this.robotEnd.y)] = "end 🤖";
      cellContent[this.getKey(this.robotStart.x, this.robotStart.y)] = "start 🤖";

      return cellContent;
    }
  },
  methods: {
    getKey(x, y) {
      return `${x}-${y}`;
    },
    getEmoji(i, j) {
      j = this.translateY(j);
      return this.mappedCellContent[this.getKey(i, j)] || "";
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

