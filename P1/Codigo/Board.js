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
            grid[i][j] = new Cell(ctx, i, j, i * (cellSize + 5), j * (cellSize + 5), cellSize, j * grid.length + i);
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
        this.startNode = null;
        this.endNode = null;
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
                            if (this.selected_cell == CELL_TYPE.START) {
                                this.startNode = null;
                            }
                            if (this.selected_cell == CELL_TYPE.END) {
                                this.endNode = null;
                                //delete this.endNode.get[this.grid[i][j].id]
                            }
                            this.grid[i][j].type = CELL_TYPE.BLANK;
                        } else {
                            if (this.selected_cell == CELL_TYPE.START) {
                                if (this.startNode) {
                                    this.startNode.type = CELL_TYPE.BLANK
                                    this.startNode = this.grid[i][j]
                                }
                                this.startNode = this.grid[i][j]
                            }
                            if (this.selected_cell == CELL_TYPE.END) {
                                if(this.endNode){
                                    this.endNode.type = CELL_TYPE.BLANK
                                    this.endNode = this.grid[i][j]
                                }
                                this.endNode = this.grid[i][j];
                                //this.endNode[this.grid[i][j].id] = this.grid[i][j]
                            }
                            this.grid[i][j].type = this.selected_cell;
                        }
                        if (this.selected_cell == CELL_TYPE.END) {
                            this.start()
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

    resetPath() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                if(this.grid[i][j].type==CELL_TYPE.PATH || this.grid[i][j].type==CELL_TYPE.EXPLORED_PATH )
                 this.grid[i][j].reset();
            }
        }
    }

    paint() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.width, this.height);
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j].paint();
            }
        }
    }



    start() {
        this.resetPath()
        let astar = new AStar(this.grid,this.rows,this.cols);
        let [path,explored_path] = astar.search(this.startNode,this.endNode);
        
        for(let [i,j] of explored_path){
            if(this.grid[i][j].type === CELL_TYPE.BLANK)
            this.grid[i][j].type = CELL_TYPE.EXPLORED_PATH;
        }
        
        if (path) {
            for (let [i, j] of path) {
                this.grid[i][j].type = CELL_TYPE.PATH;
            }
        } else {
            console.error("CAMINO NO ENCONTRADO");
        }

        this.paint()
    }
}

//export { Board };
