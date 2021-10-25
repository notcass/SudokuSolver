/// <reference path="libraries/p5.global-mode.d.ts" />

let g = [];
let g1Str =
  '100000079805074100460100038000650910006917004019432087008206040602000091000500006';

let gSolvedStr =
  '435269781682571493197834562826195347374682915951743628519326874248957136763418259';

let s;
function setup() {
  createCanvas(400, 400).parent('sketch-holder');
  background(255);
  setupGrid(g1Str);
  // setupGrid(gSolvedStr);
  s = new Solver();
}

function draw() {
  background(255);
  visualGrid(g);
}

function setupGrid(gridStr) {
  for (let i = 0; i < 9; i++) {
    g.push([]);
  }
  let i = 0;
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      changeable = g1Str[i] == 0 ? true : false;
      g[row][col] = { v: gridStr[i], c: changeable };
      i++;
    }
  }
  console.log(g);
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
      grid[row][col].c == true ? fill(0) : fill(150, 0, 255);
      textSize(34);
      text(grid[row][col].v, col * size + offset, row * size + offset);

      // Draw 3x3 Outlines
      if (col % 3 == 0 && row % 3 == 0) {
        noFill();
        strokeWeight(4);
        rect(row * size, col * size, size * 3, size * 3);
      }
    }
  }
}
