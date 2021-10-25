/**
 * Todo
 * 1. Create a function that checks if it is a completed grid --Done
 * 2. Figure out a way to make sure we don't change the starting numbers
 *    -How to do this elegantly?
 */
class Solver {
  constructor(grid) {
    this.grid = grid;
    this.counts = {};
    this.stack = [];
    this.digit = 1;
    this.current = this.getNextChangeableTile();
    this.stack.push(this.current);
  }

  solve() {
    if (!this.isGridValid() && this.stack.length != 0) {
      this.grid[this.current[0]][this.current[1]].v = this.digit;
      if (this.isGridSoftValid(this.current[0], this.current[1])) {
        this.digit = 1;
        this.current = this.getNextChangeableTile();
        this.stack.push(this.current);
      } else {
        this.digit++;

        while (this.digit > 9) {
          this.grid[this.current[0]][this.current[1]].v = 0;

          this.stack.pop();
          if (this.stack.length == 0) return;
          this.current = this.stack[this.stack.length - 1];

          this.digit = this.grid[this.current[0]][this.current[1]].v + 1;

          if (this.stack.length == 0) {
            console.log('BROKED');
            return true;
          }
        }
      }
    } else {
      console.log('SOLVED');
      return true;
    }
  }

  getNextChangeableTile() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.grid[row][col].c) {
          let tileInStack = false;

          this.stack.forEach((tile) => {
            if (row == tile[0] && col == tile[1]) {
              tileInStack = true;
            }
          });

          if (!tileInStack) return [row, col];
        }
      }
    }
    return null;
  }

  isGridValid() {
    for (let row = 0; row < 9; row++) {
      if (!this.isRowValid(row)) return false;
    }

    for (let col = 0; col < 9; col++) {
      if (!this.isColValid(col)) return false;
    }

    for (let row = 0; row < 9; row += 3) {
      for (let col = 0; col < 9; col += 3) {
        if (!this.isSubGridValid(row, col)) return false;
      }
    }
    return true;
  }
  isRowValid(row) {
    let counts = this.setupCounts();
    for (let col = 0; col < 9; col++) {
      counts[this.grid[row][col].v]++;
    }
    if (!this.isCountsValid(counts)) {
      return false;
    }
    return true;
  }

  isColValid(col) {
    let counts = this.setupCounts();
    for (let row = 0; row < 9; row++) {
      counts[this.grid[row][col].v]++;
    }
    if (!this.isCountsValid(counts)) {
      return false;
    }
    return true;
  }

  isSubGridValid(row, col) {
    let counts = this.setupCounts();
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        counts[this.grid[row + r][col + c].v]++;
      }
    }
    if (!this.isCountsValid(counts)) {
      return false;
    }
    return true;
  }

  setupCounts() {
    let counts = {};
    for (let i = 0; i < 10; i++) {
      counts[i] = 0;
    }
    return counts;
  }

  isCountsValid(counts) {
    let bool = true;
    for (let n in counts) {
      if (counts[n] > 1 || counts[0] == 1) {
        bool = false;
      }
    }

    return bool;
  }

  isGridSoftValid(row, col) {
    let counts = this.setupCounts();
    for (let col = 0; col < 9; col++) counts[this.grid[row][col].v]++;
    if (!this.isCountsSoftValid(counts)) {
      return false;
    }

    counts = this.setupCounts();
    for (let row = 0; row < 9; row++) counts[this.grid[row][col].v]++;
    if (!this.isCountsSoftValid(counts)) {
      return false;
    }

    counts = this.setupCounts();
    let rootR = row - (row % 3);
    let rootC = col - (col % 3);

    for (let r = rootR; r < rootR + 3; r++) {
      for (let c = rootC; c < rootC + 3; c++) {
        counts[this.grid[r][c].v]++;
      }
    }
    if (!this.isCountsSoftValid(counts)) {
      return false;
    }
    return true;
  }

  isCountsSoftValid(counts) {
    let bool = true;
    for (let n in counts) {
      if (counts[n] > 1 && n != 0) {
        bool = false;
      }
    }
    return bool;
  }
}
