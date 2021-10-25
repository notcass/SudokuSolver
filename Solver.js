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

  /*
    LET DIGIT  = 1

    Find first changeable spot in grid
    Add to stack
    Insert DIGIT there
    Check soft validity of row, col, subgrid
    If soft valid
    	Move to next changeable spot
    	Add to stack
    	Insert DIGIT
    Else
    	Pop stack
    DIGIT ++
  */

  solve() {
    if (!this.isGridValid()) {
      let cur = this.current;
      // First changeable spot
      // Add to stack
      // Insert digit
      this.grid[cur[0]][cur[1]].v = this.digit;
      // Check soft validity of row, col, subgrid
      if (this.isGridSoftValid(cur[0], cur[1])) {
        // If soft valid, move to next changeable spot
        this.digit = 1;
        this.current = this.getNextChangeableTile();
        this.stack.push(this.current);
        console.log('--------');
        console.log('Soft valid!');
        console.log('New Stack/Current');
        console.log(this.stack);
        console.log(this.current);
        console.log('--------');
      } else {
        // If not, try increasing number
        this.digit++;

        // if digit is 10, BACKTRACK TIME?
        if (this.digit > 9) {
          console.log('DIGIT > 9');
          this.digit = 1;
          this.stack.pop();
          this.current = this.stack.pop();

          // EMERGENCY EXIT??
          if (this.stack.length == 0) {
            console.log('BROKED');
            return true;
          }
          return;
        }
      }
    } else {
      return true;
    }
  }

  getNextChangeableTile() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        // If tile is changeable
        if (this.grid[row][col].c) {
          let tileInStack = false;

          // Make sure it's not already in the stack
          this.stack.forEach((tile) => {
            if (row == tile[0] && col == tile[1]) {
              tileInStack = true;
            }
          });

          // If changeable and not in the stack, return it
          if (!tileInStack) return [row, col];
        }
      }
    }
    return null;
  }

  isGridValid() {
    // Loop through rows
    for (let row = 0; row < 9; row++) {
      if (!this.isRowValid(row)) return false;
    }

    // Loop through cols
    for (let col = 0; col < 9; col++) {
      if (!this.isColValid(col)) return false;
    }

    // Loop through sub grids
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
      let missing = '';
      for (const c in counts) {
        if (counts[c] == 0) {
          missing += `${c}, `;
        }
      }
      // console.log('Missing: ' + missing);
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
      let missing = '';
      for (const c in counts) {
        if (counts[c] == 0) {
          missing += `${c}, `;
        }
      }
      // console.log('Missing: ' + missing);
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
      // console.log(`Invalid Subgrid at row: ${row} col: ${col}`);
      return false;
    }
    return true;
  }

  // Helper to initialize counts obj
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
    // console.log(counts);
    // console.log(bool);

    return bool;
  }

  isGridSoftValid(row, col) {
    // Check row
    let counts = this.setupCounts();
    for (let col = 0; col < 9; col++) counts[this.grid[row][col].v]++;
    if (!this.isCountsSoftValid(counts)) {
      // console.log('Row was not soft valid');
      return false;
    }

    // Check col
    counts = this.setupCounts();
    for (let row = 0; row < 9; row++) counts[this.grid[row][col].v]++;
    if (!this.isCountsSoftValid(counts)) {
      // console.log('Col was not soft valid');
      return false;
    }

    // Check subgrid
    counts = this.setupCounts();
    let rootR = row - (row % 3);
    let rootC = col - (col % 3);
    // console.log(`r: ${rootR} c: ${rootC}`);

    for (let r = rootR; r < rootR + 3; r++) {
      for (let c = rootC; c < rootC + 3; c++) {
        // console.log(`r: ${r} c: ${c}`);
        counts[this.grid[r][c].v]++;
      }
    }
    if (!this.isCountsSoftValid(counts)) {
      // console.log('Subgrid was not soft valid');

      return false;
    }
    return true;
  }

  isCountsSoftValid(counts) {
    let bool = true;
    for (let n in counts) {
      if (counts[n] > 1 && n != 0) {
        bool = false;
        // console.log(`${n} > 1 && != 0`);
      }
    }
    // console.log(bool);
    return bool;
  }
}
