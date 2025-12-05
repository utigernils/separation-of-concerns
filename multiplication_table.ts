// Pure computation: returns the grid of products without formatting
export function buildMultiplicationGrid(numbers: Array<number>): number[][] {
  return numbers.map((row) => numbers.map((col) => row * col));
}

// Pure formatting: returns a formatted table string for the given numbers/grid
export function formatMultiplicationTable(
  numbers: Array<number>,
  grid: number[][],
): string {
  const biggest = numbers.reduce((acc, n) => (n > acc ? n : acc), 0);
  let biggestResult = biggest * biggest;
  let magnitude = 0;
  while (biggestResult > 0) {
    magnitude++;
    biggestResult = Math.round(biggestResult / 10);
  }
  magnitude++;

  let titleRow = "*";
  while (titleRow.length < magnitude) {
    titleRow = " " + titleRow;
  }
  titleRow += " ||";
  for (const n of numbers) {
    let cell = `${n}`;
    while (cell.length < magnitude) {
      cell = " " + cell;
    }
    titleRow += `${cell} |`;
  }

  let sep = "";
  for (let i = 0; i < titleRow.length; i++) {
    sep += "=";
  }

  const rows: string[] = [titleRow, sep];
  for (let r = 0; r < numbers.length; r++) {
    const n = numbers[r];
    let row = `${n}`;
    while (row.length < magnitude) {
      row = ` ${row}`;
    }
    row = `${row} ||`;
    for (let c = 0; c < numbers.length; c++) {
      const product = grid[r][c];
      let cell = `${product}`;
      while (cell.length < magnitude) {
        cell = ` ${cell}`;
      }
      cell += " |";
      row += cell;
    }
    rows.push(row);
  }
  return rows.join("\n");
}

// Orchestration: keeps I/O at the boundaries
export function printMultiplicationTable(numbers: Array<number>) {
  const grid = buildMultiplicationGrid(numbers);
  const output = formatMultiplicationTable(numbers, grid);
  console.log(output);
}
