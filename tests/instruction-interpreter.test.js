import InstructionInterpreter from '../services/instruction-interpreter'

test('Test check cleaned patches', () => {
  let interpreter = new InstructionInterpreter(5, 5);

  let robot = {x: 1, y: 2};
  let patches = [{x: 2, y: 3}, {x: 1, y: 4}, {x: 5, y: 3}];
  let instructions = "NENWS";
  expect(interpreter.checkCleanedPatches(robot, patches, instructions)).toEqual({
      coords: {x: 1, y: 3},
      patches: 2
  });
});
