//import { Cell, CELL_TYPE } from "./Cell.js";

function makeGrid(cols, rows) {
    let grid = new Array(cols);
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }
    return grid;
}

function initGrid(board) {
    let grid = board.grid;
    let space = board.space;
    let cellSize = board.cellSize;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = new Cell(board, i, j, i * (cellSize + space), j * (cellSize + space), cellSize, j * grid.length + i);
        }
    }
    generateMaze(grid)
    return grid;
}

function generateMaze(grid) {
    // Muros en posiciones pares, huecos en posiciones impares,
    // Grid deberia tener una longitud impar, ya que esta rodeado de muros

    //Muros exteriores
    for (let i = 0; i < grid.length; i++) {
        if (i==0 || i == grid.length - 1) {
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j].type = CELL_TYPE.BLOCKED
            }
        } else {
            grid[i][0].type = CELL_TYPE.BLOCKED
            grid[i][grid[i].length-1].type = CELL_TYPE.BLOCKED
        }
    }
    //Muros interiores
    recursiveDivision(1,grid.length-2,1,grid.length-2,grid)
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function recursiveDivision(minX, maxX, minY, maxY, grid) {
    let horizontal;
    if (maxX-minX < maxY-minY)
        horizontal = true
    else if (maxY -minY< maxX -minX)
        horizontal = false
    else
        horizontal = randomNumber(0, 1) == 0

    if (horizontal) {
        if (maxX - minX < 2) return;

        let y = Math.floor(randomNumber(minY, maxY)/2)*2
        let hole = Math.floor(randomNumber(minX, maxX)/2)*2 +1
        for (let i = minX; i <= maxX; i++) {
            grid[i][y].type=CELL_TYPE.BLOCKED;
            grid[i][y].paint({user:{maxHeight:0}})

        }
        grid[hole][y].type=CELL_TYPE.BLANK;
        grid[hole][y].paint()

        recursiveDivision(minX, maxX, minY, y-1, grid);
        recursiveDivision(minX, maxX, y + 1, maxY, grid);
    } else {
        if (maxY - minY < 2) return;

        let x = Math.floor(randomNumber(minX, maxX)/2)*2;
        let hole = Math.floor(randomNumber(minY, maxY)/2)*2 +1
        for (let j = minY; j <= maxY; j++) {
            grid[x][j].type=CELL_TYPE.BLOCKED;
            grid[x][j].paint({user:{maxHeight:0}})
        }
        grid[x][hole].type=CELL_TYPE.BLANK;

        recursiveDivision(minX, x-1, minY, maxY, grid);
        recursiveDivision(x + 1, maxX, minY, maxY, grid);
    }
}



class Board {
    constructor(cols, rows, cellSize,space) {
        this.space = space;
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
            "maxHeight": 0
        }
        this.images = {}
        /** @type {CanvasRenderingContext2D} */
        this.ctx = null;
        this.animating = [];
    }

    create() {
        if (this.ctx) return this.ctx;
        let canvas = document.querySelector("canvas");
        let ctx = canvas.getContext("2d");
        this.ctx = ctx;
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.addEventListener("mousedown", (event) => {
            let rect = canvas.getBoundingClientRect();
            let mouseX = event.x - rect.left;
            let mouseY = event.y - rect.top;
            let i = Math.floor(mouseX/(this.cellSize+this.space))
            let j = Math.floor(mouseY/(this.cellSize+this.space))

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
        function loadImages(imagesList,callback) {
            const images = {};
            let loadedImgs = 0;
            for (let [key, value] of Object.entries(imagesList)) {
                images[key] = new Image(value);
                images[key].onload = function () {
                    if (++loadedImgs >= Object.keys(imagesList).length) {
                        callback(images);
                    }
                };
                images[key].src = value;
            }
        } 
        this.ctx.font = this.width/20 + 'px arial'
        this.ctx.textAlign= 'center'
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = 'white'
        this.ctx.fillText('LOADING RESOURCES', this.width/2,this.height/2)
        this.images = loadImages(
            {
                ANGEL: "assets/scale/angel.png",
                WALL: "assets/scale/crystal_wall11.png",
                SOLDIER: "assets/scale/deep_elf_soldier.png",
                TRAP: "assets/scale/dngn_trap_spear.png",
                GIANT: "assets/scale/hill_giant.png",
                HUMAN: "assets/scale/human.png",
                KEY: "assets/scale/key.png",
                BOX: "assets/scale/large_box.png",
                LAVA: "assets/scale/lava3.png",
                BOMB: "assets/scale/sprite.png",
            },
            (images) => {
                this.images = images;
                initGrid(this);
                this.paint()
            }
        );        
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
                //this.ctx.fillText(i + ',' + j, this.grid[i][j].x + this.cellSize / 2, this.grid[i][j].y + this.cellSize / 2 + 10)
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
            let [path, explored_path, solucion] = astar.search(first, last);
            fullExploredPath.push(...explored_path)
            if (!solucion) break;
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
                    requestAnimationFrame(() => this.grid[cell[0]][cell[1]].paint())
                    
                }

            }, 100);
            this.animating.push(inter2)
        }

        const paintPath = () => {
            if (this.animating.length !== 0) {
                let el = this.animating.pop()
                while (el) {
                    clearInterval(el)
                    el = this.animating.pop()
                }
            }
            const gen = generator(fullExploredPath)
            const inter = setInterval(() => {
                const cell = gen.next().value
                if(!cell){
                    clearInterval(inter)
                    paintExplored()
                } else {
                    if (this.grid[cell[0]][cell[1]].type === CELL_TYPE.BLANK) {
                        this.grid[cell[0]][cell[1]].type = CELL_TYPE.EXPLORED_PATH;
                        requestAnimationFrame(() => this.grid[cell[0]][cell[1]].paint())
                    }
                }    
            }, 35); 
            this.animating.push(inter)
        }

        paintPath()
    }
}

//export { Board };
