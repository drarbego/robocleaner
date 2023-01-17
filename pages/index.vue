<template>
  <div>
    <div>
      {{showInterpreter ? "Solver" : "Summary"}}
    </div>
    <button @click="showInterpreter = !showInterpreter">{{showInterpreter ? "Show solver" : "Show Summary"}}</button>
    <div v-if="showInterpreter">
      <Interpreter />
    </div>
    <div v-else>
      <Controls />
      <Display />
    </div>
  </div>

</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      showInterpreter: true
    };
  }
}
</script>
