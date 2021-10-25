/// <reference path="libraries/p5.global-mode.d.ts" />

let g = [];

let gSolvedStr =
  '435269781682571493197834562826195347374682915951743628519326874248957136763418259';

let gAlmostSolvedStr =
  '435209781682501493197834502806195340374682915951743028519026874248957136003418259';

let gWikiStr =
  '530070000600195000098000060800060003400803001700020006060000280000419005000080079';

let gHardStr1 =
  '030600400000000060000009008001026040300050700206003001080190000005340007427000900';

let s;
let solveFlag = false;
let fastSolveFlag = false;

function setup() {
  createCanvas(400, 400).parent('sketch-holder');
  background(255);
  // setupGrid(gSolvedStr);
  // setupGrid(gAlmostSolvedStr);
  // setupGrid(gWikiStr);
  setupGrid(gHardStr1);
  s = new Solver(g);
}

function draw() {
  background(255);
  visualGrid(g);
  if (solveFlag) {
    for (let i = 0; i < 10; i++) {
      if (s.solve()) solveFlag = false;
    }
  }
}

function fastSolve() {
  if (!solveFlag) {
    while (true) {
      if (s.solve()) break;
    }
  }
}

function setupGrid(gridStr) {
  for (let i = 0; i < 9; i++) {
    g.push([]);
  }
  let i = 0;
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      changeable = gridStr[i] == 0 ? true : false;
      g[row][col] = { v: gridStr[i], c: changeable };
      i++;
    }
  }
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

function keyPressed() {
  if (key === '1') {
    s.solve();
  }
  if (key === '2') {
    for (let i = 0; i < 40; i++) {
      s.solve();
    }
  }
  if (key === 'q') solveFlag = !solveFlag;
  if (key === 'f') fastSolve();
}
