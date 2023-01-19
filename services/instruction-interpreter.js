export default class InstructionInterpreter {
  getCleaningSummary(robot, dirtPatches, instructions) {
    const patchMapping = dirtPatches.reduce((acc, patch) => ({...acc, [`${patch.x}-${patch.y}`]: patch}), {});
    let cursor = {x: robot.x, y: robot.y};
    let cleanedPatches = 0;
    let steps = [{...cursor}];
    Array.from(instructions).forEach((direction) => {
      switch(direction) {
        case "N":
          cursor.y += 1;
          break;
        case "S":
          cursor.y -= 1;
          break;
        case "E":
          cursor.x += 1;
          break;
        case "W":
          cursor.x -= 1;
          break;
      }
      steps.push({...cursor});
      let cursorKey = `${cursor.x}-${cursor.y}`;
      if (patchMapping[cursorKey]) {
        cleanedPatches += 1; } });
    return {
      coords: cursor,
      patches: cleanedPatches,
      steps
    };
  }
}
