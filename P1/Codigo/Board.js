//import { Cell, CELL_TYPE } from "./Cell.js";

const space = 1;
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
            grid[i][j] = new Cell(ctx, i, j, i * (cellSize + space), j * (cellSize + space), cellSize, j * grid.length + i);
        }
    }
    return grid;
}

class Board {
    constructor(cols, rows, cellSize) {
        this.cols = cols;
        this.rows = rows;
        this.cellSize = cellSize;
        this.width = cols * (cellSize + space) - space;
        this.height = rows * (cellSize + space) - space;
        this.grid = makeGrid(cols, rows);
        this.selected_cell = CELL_TYPE.BLANK;
        this.blocked_height = 0;
        this.startNode = null;
        this.endNode = null;
        this.waypoints = [];
        this.userFeatures = {
            "maxHeight": 500
        }
        /** @type {CanvasRenderingContext2D} */
        this.ctx = null;
    }

    create() {
        if (this.ctx) return this.ctx;
        let canvas = document.querySelector("canvas");
        let ctx = canvas.getContext("2d");
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.addEventListener("mousedown", (event) => {
            let rect = canvas.getBoundingClientRect();
            let mouseX = event.x - rect.left;
            let mouseY = event.y - rect.top;
            let i = Math.floor(mouseX/(this.cellSize+space))
            let j = Math.floor(mouseY/(this.cellSize+space))

            if (this.grid[i][j].checkIn(mouseX, mouseY)) {
                if (this.grid[i][j].type === this.selected_cell) {
                    // Deseleccionar casilla
                    switch (this.selected_cell) {
                        case CELL_TYPE.START:
                            this.startNode = null;
                            break;
                        case CELL_TYPE.END:
                            this.endNode = null;
                            break;
                        case CELL_TYPE.WAYPOINT:
                            let index = this.waypoints.findIndex(w => w.i === i && w.j === j);
                            this.waypoints.splice(index, 1);
                            break;
                        }
                        this.grid[i][j].type = CELL_TYPE.BLANK;
                        this.grid[i][j].height = 0;
                    
                } else {
                    // Seleccionar casillas

                    // Mover casillas de inicio y fin
                    if (this.selected_cell === CELL_TYPE.START) {
                        if (this.startNode) {
                            this.startNode.type = CELL_TYPE.BLANK
                            this.startNode = this.grid[i][j]
                        }
                        this.startNode = this.grid[i][j]
                    }
                    if (this.selected_cell === CELL_TYPE.END) {
                        if (this.endNode) {
                            this.endNode.type = CELL_TYPE.BLANK
                            this.endNode = this.grid[i][j]
                        }
                        this.endNode = this.grid[i][j];
                    }
                    if (this.selected_cell === CELL_TYPE.WAYPOINT) {
                        this.waypoints.push(this.grid[i][j])
                    }
                    this.grid[i][j].type = this.selected_cell;
                    this.grid[i][j].height = this.blocked_height;
                }
                // Comenzar algoritmo al mover las casillas de start o end
                if (this.selected_cell === CELL_TYPE.END && this.startNode) {
                    this.start()
                } else if (this.selected_cell === CELL_TYPE.START && this.endNode) {
                    this.start()
                }
            }
            this.paint();
        });
        this.ctx = ctx;
        initGrid(this.grid, this.ctx, this.cellSize);
    }

    reset() {
        this.startNode = null;
        this.endNode = null;
        this.waypoints = []
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j].reset();
            }
        }
    }

    resetPath() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j].type == CELL_TYPE.PATH || this.grid[i][j].type == CELL_TYPE.EXPLORED_PATH)
                    this.grid[i][j].reset();
                if (this.grid[i][j].type == CELL_TYPE.BLOCKED) {
                    this.grid[i][j].color = null;
                }
            }
        }
    }

    paint() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.width, this.height);
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j].paint(this.userFeatures);
                this.ctx.font = this.cellSize/3 + 'px courier'
                this.ctx.textAlign= 'center'
                this.ctx.fillStyle = 'white'
                this.ctx.fillText(i + ',' + j, this.grid[i][j].x + this.cellSize / 2, this.grid[i][j].y + this.cellSize / 2 + 10)
            }
        }
    }



    start() {
        if (!this.startNode || !this.endNode) {
            return;
        }
        this.resetPath()
        let astar = new AStar(this.grid, this.rows, this.cols, this.userFeatures);
        let fullPath = []
        let fullExploredPath = []

        this.waypoints.push(this.endNode)
        let first = this.startNode
        for (const last of this.waypoints) {
            let [path, explored_path] = astar.search(first, last);
            fullExploredPath.push(...explored_path)
            if (path.length === 0) break;
            fullPath.push(...path)
            fullPath.push([last.i,last.j])
            first = last
        }
        this.waypoints.pop()

        function* generator(data){
            yield* data;
        }

        const paintLinePath = () => {
            let prev = this.startNode
            for (const cell of fullPath) {
                let actual = this.grid[cell[0]][cell[1]]               
                this.ctx.save()
                this.ctx.translate(this.cellSize/2,this.cellSize/2)
                this.ctx.strokeStyle = "white"
                this.ctx.lineWidth = 2
                this.ctx.beginPath();
                this.ctx.moveTo(prev.x,prev.y)
                this.ctx.lineTo(actual.x, actual.y);
                this.ctx.closePath();   
                this.ctx.stroke();
                this.ctx.restore()
                prev = actual
            }
            if (fullPath.length !== 0) {                
                this.ctx.beginPath()
                this.ctx.strokeStyle = "white"
                this.ctx.lineWidth = 2
                this.ctx.lineTo(prev.x+ this.cellSize/2,prev.y+ this.cellSize/2);
                this.ctx.lineTo(this.endNode.x  + this.cellSize/2, this.endNode.y  + this.cellSize/2);                            
                this.ctx.closePath()
                this.ctx.stroke();
            }
        }

        const paintExplored = () => {
            let gen = generator(fullPath)
            let inter2 = setInterval(() => {
                let cell = gen.next().value
                if(!cell){
                    clearInterval(inter2)
                    paintLinePath()
                } else {
                    if (this.grid[cell[0]][cell[1]].type === CELL_TYPE.BLANK || this.grid[cell[0]][cell[1]].type === CELL_TYPE.EXPLORED_PATH) {
                        this.grid[cell[0]][cell[1]].type = CELL_TYPE.PATH;
                    } else if (this.grid[cell[0]][cell[1]].type === CELL_TYPE.BLOCKED) {
                        this.grid[cell[0]][cell[1]].color = 'orange';
                    }
                    requestAnimationFrame(() => this.paint())
                    
                }

            }, 100);
        }

        const paintPath = () => {
            let gen = generator(fullExploredPath)
            let inter = setInterval(() => {
                let cell = gen.next().value
                if(!cell){
                    clearInterval(inter)
                    paintExplored()
                } else {
                    if (this.grid[cell[0]][cell[1]].type === CELL_TYPE.BLANK) {
                        this.grid[cell[0]][cell[1]].type = CELL_TYPE.EXPLORED_PATH;
                        requestAnimationFrame(() => this.paint())
                    }
                }    
            }, 35); 
        }

        paintPath()
    }
}

//export { Board };
