/// <reference path="libraries/p5.global-mode.d.ts" />

let g1 = [
  // [1, 3, 2, 4, 5, 6, 7, 8, 9], //Test Row
  [1, 0, 0, 0, 0, 0, 0, 7, 9],
  [8, 0, 5, 0, 7, 4, 1, 0, 0],
  [4, 6, 0, 1, 0, 0, 0, 3, 8],
  [0, 0, 0, 6, 5, 0, 9, 1, 0],
  [0, 0, 6, 9, 1, 7, 0, 0, 4],
  [0, 1, 9, 4, 3, 2, 0, 8, 7],
  [0, 0, 8, 2, 0, 6, 0, 4, 0],
  [6, 0, 2, 0, 0, 0, 0, 9, 1],
  [0, 0, 0, 5, 0, 0, 0, 0, 6],
];

// Col Testing
let g2 = [
  [1, 0, 0, 0, 0, 0, 0, 7, 9],
  [2, 0, 5, 0, 7, 4, 1, 0, 0],
  [3, 6, 0, 1, 0, 0, 0, 3, 8],
  [4, 0, 0, 6, 5, 0, 9, 1, 0],
  [5, 0, 6, 9, 1, 7, 0, 0, 4],
  [6, 1, 9, 4, 3, 2, 0, 8, 7],
  [7, 0, 8, 2, 0, 6, 0, 4, 0],
  [8, 0, 2, 0, 0, 0, 0, 9, 1],
  [9, 0, 0, 5, 0, 0, 0, 0, 6],
];

// Sub-grid Testing
let g3 = [
  [1, 2, 3, 0, 0, 0, 0, 7, 9],
  [4, 5, 6, 0, 7, 8, 1, 0, 0],
  [7, 8, 9, 1, 0, 0, 0, 3, 8],
  [4, 0, 0, 6, 5, 0, 9, 1, 0],
  [5, 0, 6, 9, 1, 7, 0, 0, 4],
  [6, 1, 9, 4, 3, 2, 0, 8, 7],
  [7, 0, 8, 2, 0, 6, 0, 4, 0],
  [8, 0, 2, 0, 0, 0, 0, 9, 1],
  [9, 0, 0, 5, 0, 0, 0, 0, 6],
];

// Solved grid Testing
let g4 = [
  [4, 3, 5, 2, 6, 9, 7, 8, 1],
  [6, 8, 2, 5, 7, 1, 4, 9, 3],
  [1, 9, 7, 8, 3, 4, 5, 6, 2],
  [8, 2, 6, 1, 9, 5, 3, 4, 7],
  [3, 7, 4, 6, 8, 2, 9, 1, 5],
  [9, 5, 1, 7, 4, 3, 6, 2, 8],
  [5, 1, 9, 3, 2, 6, 8, 7, 4],
  [2, 4, 8, 9, 5, 7, 1, 3, 6],
  [7, 6, 3, 4, 1, 8, 2, 5, 9],
];

let s;
function setup() {
  createCanvas(400, 400).parent('sketch-holder');
  background(255);
  visualGrid(g1);
  s = new Solver();
}

function visualGrid(grid) {
  textAlign(CENTER, CENTER);
  const size = width / 9;
  const offset = size / 2;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      // Draw Box
      noFill();
      strokeWeight(1);
      stroke(0);
      rect(row * size, col * size, size, size);

      // Draw Text
      grid[row][col] == 0 ? fill(150, 0, 255) : fill(0);
      textSize(34);
      text(grid[row][col], col * size + offset, row * size + offset);

      // Draw 3x3 Outlines
      if (col % 3 == 0 && row % 3 == 0) {
        noFill();
        strokeWeight(4);
        rect(row * size, col * size, size * 3, size * 3);
      }
    }
  }
}

function printGrid(grid) {
  grid.forEach((r) => {
    let str = '';
    r.forEach((c) => {
      str += c + ' ';
    });
    console.log(str);
  });
}
