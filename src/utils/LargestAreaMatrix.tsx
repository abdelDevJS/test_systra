
export default function LargestAreaMatrix(matrix: number[][]) {
  let cache: any = {};
  let coordinatesArray: string[] = [];
  function pulse(x: number, y: number) {
    let queue: any = [],
      visited: any = {},
      size: number = 0;

    // Current cell is the first element
    queue.push({
      x: x,
      y: y,
    });

    visited[x + " " + y] = true;
    size = 1;

    function test(x: number, y: number, value: number) {
      if (
        !visited[x + " " + y] &&
        y >= 0 &&
        y < matrix.length &&
        x >= 0 &&
        x < matrix[y].length &&
        matrix[y][x] === value
      ) {
        queue.push({
          x: x,
          y: y,
        });
        console.log("testQueue ==>", queue);
        visited[x + " " + y] = true;
        console.log("visited from test==> ", visited);
        size += 1;
      }
    }

    while (queue.length) {
      let cell = queue.pop(),
        value = matrix[cell.y][cell.x];
      console.log("QUE IN LOOP ==>", cell);
      // Add neighbors of the same value to the queue
      test(cell.x - 1, cell.y, value);
      test(cell.x + 1, cell.y, value);
      test(cell.x, cell.y - 1, value);
      test(cell.x, cell.y + 1, value);
    }

    // Cache the size for all visited cells for performances
    for (let key in visited) {
      cache[key] = size;
    }
    return size;
  }
  function getKeysfromValue(value: number, cache: any) {
    let coordinatesArray = [];
    for (const key in cache) {
      if (cache[key] === value) {
        coordinatesArray.push(key);
      }
    }
    return coordinatesArray;
  }
  let max = 0;
  let colorValue = 0;
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < matrix[y].length; ++x) {
      console.log("CACHE==>", cache);
      if (!cache[x + " " + y]) {
        let size = pulse(x, y);
        if (size > max) {
          max = size;
          colorValue = matrix[y][x];
        }
      }
    }
  }
  coordinatesArray = getKeysfromValue(max, cache);
  console.log(
    "Largest area size",
    max,
    " +++",
    colorValue,
    "coordinatesArray",
    coordinatesArray
  );
  return {max:max,colorValue:colorValue,coordinatesArray:coordinatesArray}
}
