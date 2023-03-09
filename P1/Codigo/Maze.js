function mazeGenerator(grid) {
    // Muros en posiciones pares, huecos en posiciones impares,
    // Grid deberia tener una longitud impar, ya que esta rodeado de muros

    //Muros exteriores
    for (let i = 0; i < grid.length; i++) {
        if (i == 0 || i == grid.length - 1) {
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j].type = CELL_TYPE.BLOCKED
            }
        } else {
            grid[i][0].type = CELL_TYPE.BLOCKED
            grid[i][grid[i].length - 1].type = CELL_TYPE.BLOCKED
            grid[i][grid[i].length - 1].height = 1500

        }
    }
    //Muros interiores
    recursiveDivision(1, grid.length - 2, 1, grid[0].length - 2, grid)
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function recursiveDivision(minX, maxX, minY, maxY, grid) {
    let horizontal;
    if (maxX - minX < maxY - minY)
        horizontal = true
    else if (maxY - minY < maxX - minX)
        horizontal = false
    else
        horizontal = randomNumber(0, 1) == 0

    if (horizontal) {
        if (maxX - minX < 2) return;

        let y = Math.floor(randomNumber(minY, maxY) / 2) * 2
        let hole = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1
        for (let i = minX; i <= maxX; i++) {
            grid[i][y].type = CELL_TYPE.BLOCKED;
        }
        grid[hole][y].type = CELL_TYPE.BLANK;

        recursiveDivision(minX, maxX, minY, y - 1, grid);
        recursiveDivision(minX, maxX, y + 1, maxY, grid);
    } else {
        if (maxY - minY < 2) return;

        let x = Math.floor(randomNumber(minX, maxX) / 2) * 2;
        let hole = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1
        for (let j = minY; j <= maxY; j++) {
            grid[x][j].type = CELL_TYPE.BLOCKED;
        }
        grid[x][hole].type = CELL_TYPE.BLANK;

        recursiveDivision(minX, x - 1, minY, maxY, grid);
        recursiveDivision(x + 1, maxX, minY, maxY, grid);
    }
}