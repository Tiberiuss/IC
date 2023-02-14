//import { Cell, CELL_TYPE } from "./Cell.js";

function makeGrid(cols, rows) {
    let grid = new Array(cols);
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }
    return grid;
}

function initGrid(grid, ctx, cellSize) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = new Cell(ctx, i * cellSize, j * cellSize, cellSize, cellSize);
        }
    }
    return grid;
}

class Board {
    constructor(cols, rows, cellSize) {
        this.cols = cols;
        this.rows = rows;
        this.cellSize = cellSize;
        this.width = cols * cellSize;
        this.height = rows * cellSize;
        this.grid = makeGrid(cols, rows);
        this.selected_cell = CELL_TYPE.BLANK;
        /** @type {CanvasRenderingContext2D} */
        this.ctx = null;
    }

    create() {
        if (this.ctx) return this.ctx;
        let canvas = document.querySelector("canvas");
        let ctx = canvas.getContext("2d");
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.addEventListener("click", (event) => {
            let rect = canvas.getBoundingClientRect();
            let mouseX = event.x - rect.left;
            let mouseY = event.y - rect.top;
            for (let i = 0; i < this.grid.length; i++) {
                for (let j = 0; j < this.grid[i].length; j++) {
                    if (this.grid[i][j].checkIn(mouseX, mouseY)) {
                        if (this.grid[i][j].type === this.selected_cell) {
                            this.grid[i][j].type = CELL_TYPE.BLANK;
                        } else {
                            this.grid[i][j].type = this.selected_cell;
                        }
                    }
                }
            }
            this.paint();
        });
        this.ctx = ctx;
        initGrid(this.grid, this.ctx, this.cellSize);
    }

    reset() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j].reset();
            }
        }
    }

    paint() {
        this.ctx.fillRect(0, 0, this.width, this.height);
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j].paint();
            }
        }
    }

    start() {
        console.log("ALGORITMO GUAPO");
    }
}

//export { Board };
