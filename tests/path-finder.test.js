import PathFinder from '../services/path-finding';

test('Test extract closest', () => {
  let finder = new PathFinder(5, 5);

  let p1 = {x: 0, y:0};
  let p2 = {x: 3, y: 4};
  expect(finder.calculateDistance(p1, p2)).toBe(5);

  p1 = {x: 13, y: 14};
  p2 = {x: 1, y: 6};
  expect(finder.calculateDistance(p1, p2)).toBeCloseTo(14.42);
});

test('Test Extract closest', () => {
  let finder = new PathFinder(10, 10);

  let robot = {x: 5, y: 5};
  let points = [{x: 0, y: 0}, {x: 4, y: 3}, {x: 8, y: 7}];
  expect(finder.extractClosest(robot, points)).toEqual({x: 4, y: 3});
});

test('Test get path', () => {
  let finder = new PathFinder(10, 10);

  let robot = {x: 5, y: 5};
  let destination = {x: 6, y: 6};
  expect(finder.getPath(robot, destination)).toEqual(["N", "E"]);
});

test('Test find', () => {
  let finder = new PathFinder(5, 5);

  let robot = {x: 1, y: 2};
  let patches = [{x: 1, y: 0}, {x: 2, y: 2}, {x: 2, y: 3}];
  expect(finder.find(robot, patches)).toEqual(["E", "N", "S", "S", "S", "W"]);
});

