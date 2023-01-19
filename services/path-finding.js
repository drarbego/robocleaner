export default class PathFinder {
  constructor(xSize, ySize) {
    this.xSize = xSize;
    this.ySize = ySize;
  }

  find(robot, patches) {
    let dirtPatches = [...patches];
    let path = [];
    let cursor = {x: robot.x, y: robot.y};
    while(dirtPatches.length > 0) {
      let closestPatch = this.extractClosest(cursor, dirtPatches);
      path = [...path, ...this.getPath(cursor, closestPatch)];
      cursor = {x: closestPatch.x, y: closestPatch.y};
    }
    return path;
  }

  extractClosest(robot, dirtPatches) {
    let minDist = null;
    let index = 0;
    dirtPatches.forEach((patch, i) => {
      let dist = this.calculateDistance(robot, patch);
      if (minDist === null || dist < minDist) {
        minDist = dist;
        index = i;
      }
    });
    let element = dirtPatches[index];
    dirtPatches.splice(index, 1);

    return element;
  }

  calculateDistance(p1, p2) {
    return Math.sqrt(
      Math.pow(Math.abs(p1.x - p2.x), 2) +
      Math.pow(Math.abs(p1.y - p2.y), 2)
    );
  }

  getPath(p1, p2) {
    let path = [];
    let cursor = {x: p1.x, y: p1.y};
    while (cursor.x !== p2.x || cursor.y !== p2.y) {
      let x_diff = p2.x - cursor.x;
      let y_diff = p2.y - cursor.y;
      if (Math.abs(x_diff) > Math.abs(y_diff)) {
        if (x_diff < 0) {
          path.push("W");
          cursor.x -= 1;
        } else {
          path.push("E");
          cursor.x += 1;
        }
      } else {
        if (y_diff < 0) {
          path.push("S");
          cursor.y -= 1;
        } else {
          path.push("N");
          cursor.y += 1;
        }
      }
    }
    return path;
  }
}

