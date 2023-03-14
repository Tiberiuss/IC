//import { Cell, CELL_TYPE } from "./Cell.js";

class Board {
    constructor(cols, rows, cellSize, space) {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = null;
        this.space = space;
        this.cols = cols;
        this.rows = rows;
        this.cellSize = cellSize;
        this.width = cols * (cellSize + space) - space;
        this.height = rows * (cellSize + space) - space;
        this.grid = new Array(cols);
        for (let i = 0; i < cols; i++) this.grid[i] = new Array(rows);
        this.startNode = null;
        this.endNode = null;
        this.waypoints = [];
        this.images = {}
        this.selected_cell = CELL_TYPE.BLANK;
        this.peso = 0;
        this.user_type = USER_TYPE.HUMAN // tipo de usuario
        this.blocked_type = null;
        this.animating = [];
    }

    destroy() {
        let canvas = document.querySelector("canvas")
        let new_canvas = canvas.cloneNode(true);
        canvas.parentNode.replaceChild(new_canvas,canvas);
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
            let i = Math.floor(mouseX / (this.cellSize + this.space))
            let j = Math.floor(mouseY / (this.cellSize + this.space))
            if (this.grid[i][j].checkIn(mouseX, mouseY)) {
                // Parar animacion
                this.clearAnimation()
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
                    this.grid[i][j].blocked_type = 0;
                    this.grid[i][j].peso = 0;

                } else {
                    // Seleccionar casillas

                    // Mover casillas de inicio y fin
                    if (this.selected_cell === CELL_TYPE.START) {
                        if (this.grid[i][j] === this.endNode) {
                            this.endNode = null;
                        }
                        if (this.grid[i][j].type == CELL_TYPE.WAYPOINT) {
                            let index = this.waypoints.findIndex(w => w.i === i && w.j === j);
                            if (index) {
                                this.waypoints.splice(index,1)
                            }
                        }
                        if (this.startNode) {
                            this.startNode.type = CELL_TYPE.BLANK
                            this.startNode.paint();
                            this.startNode = this.grid[i][j]
                        }
                        this.startNode = this.grid[i][j]
                    } else if (this.selected_cell === CELL_TYPE.END) {
                        if (this.grid[i][j] === this.startNode) {
                            this.startNode = null;
                        }
                        if (this.grid[i][j].type == CELL_TYPE.WAYPOINT) {
                            let idx = this.waypoints.indexOf(this.grid[i][j])
                            if (idx !== -1) {
                                this.waypoints.splice(idx,1)
                            }
                        }
                        if (this.endNode) {
                            this.endNode.type = CELL_TYPE.BLANK
                            this.endNode.paint();
                            this.endNode = this.grid[i][j]
                        }
                        this.endNode = this.grid[i][j];
                    } else if (this.selected_cell === CELL_TYPE.WAYPOINT) {
                        if (this.grid[i][j] === this.startNode) {
                            this.startNode = null;
                        } else if (this.grid[i][j] === this.endNode) {
                            this.endNode = null;
                        }
                        this.waypoints.push(this.grid[i][j])
                    } else {
                        if (this.grid[i][j] === this.startNode) {
                            this.startNode = null;
                        } else if (this.grid[i][j] === this.endNode) {
                            this.endNode = null;
                        }
                    }
                    this.grid[i][j].reset()
                    this.grid[i][j].type = this.selected_cell;
                    this.grid[i][j].blocked_type = this.blocked_type;
                    this.grid[i][j].peso = this.peso;
                    this.grid[i][j].color = null;
                }
                // Comenzar algoritmo al mover las casillas de start o end
                if (this.selected_cell === CELL_TYPE.END && this.startNode) {
                    this.start()
                } else if (this.selected_cell === CELL_TYPE.START && this.endNode) {
                    this.start()
                }
            }
            this.grid[i][j].paint();
        });
        function loadImages(imagesList, callback) {
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
        this.ctx.font = this.width / 20 + 'px arial'
        this.ctx.textAlign = 'center'
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = 'white'
        this.ctx.fillText('LOADING RESOURCES', this.width / 2, this.height / 2)
        this.images = loadImages(
            {
                ANGEL: "assets/angel.png",
                WALL: "assets/crystal_wall11.png",
                SOLDIER: "assets/deep_elf_soldier.png",
                TRAP: "assets/dngn_trap_spear.png",
                GIANT: "assets/hill_giant.png",
                HUMAN: "assets/human.png",
                KEY: "assets/key.png",
                BOX: "assets/large_box.png",
                LAVA: "assets/lava3.png",
                BOMB: "assets/sprite.png",
            },
            (images) => {
                this.images = images;
                // Init grid
                for (let i = 0; i < this.grid.length; i++) {
                    for (let j = 0; j < this.grid[i].length; j++) {
                        this.grid[i][j] = new Cell(this, i, j, i * (this.cellSize + this.space), j * (this.cellSize + this.space), this.cellSize, j * this.grid.length + i);
                    }
                }
                this.generateMaze()
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
                this.grid[i][j].paint();
                this.ctx.font = this.cellSize / 3 + 'px courier'
                this.ctx.textAlign = 'center'
                this.ctx.fillStyle = 'white'
                //this.ctx.fillText(i + ',' + j, this.grid[i][j].x + this.cellSize / 2, this.grid[i][j].y + this.cellSize / 2 + 10)
            }
        }
    }

    generateMaze() {
        mazeGenerator(this.grid)
    }

    clearAnimation() {
        if (this.animating.length !== 0) {
            let el = this.animating.pop()
            while (el) {
                clearInterval(el)
                el = this.animating.pop()
            }
        }
    }

    start() {
        if (!this.startNode || !this.endNode) {
            return;
        }
        this.resetPath()
        this.paint()
        let astar = new AStar(this.grid, this.rows, this.cols, this.userFeatures);
        let fullPath = []
        let fullExploredPath = []
        let sol = false;

        this.waypoints.push(this.endNode)
        let first = this.startNode
        for (const last of this.waypoints) {
            let [path, explored_path, solucion] = astar.search(first, last);
            sol = solucion
            fullExploredPath.push(...explored_path)
            if (!solucion) break;
            fullPath.push(...path)
            fullPath.push([last.i, last.j])
            first = last
        }
        this.waypoints.pop()

        function* generator(data) {
            yield* data;
        }

        const paintLinePath = () => {
            let prev = this.startNode
            for (const cell of fullPath) {
                let actual = this.grid[cell[0]][cell[1]]
                this.ctx.save()
                this.ctx.translate(this.cellSize / 2, this.cellSize / 2)
                this.ctx.strokeStyle = "white"
                this.ctx.lineWidth = 2
                this.ctx.beginPath();
                this.ctx.moveTo(prev.x, prev.y)
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
                this.ctx.lineTo(prev.x + this.cellSize / 2, prev.y + this.cellSize / 2);
                this.ctx.lineTo(this.endNode.x + this.cellSize / 2, this.endNode.y + this.cellSize / 2);
                this.ctx.closePath()
                this.ctx.stroke();
            }
        }

        const paintBestPath = () => {
            let gen = generator(fullPath)
            let inter2 = setInterval(() => {
                let cell = gen.next().value
                if (!cell) {
                    clearInterval(inter2)
                    paintLinePath()
                } else {
                    if (this.grid[cell[0]][cell[1]].type === CELL_TYPE.BLANK || this.grid[cell[0]][cell[1]].type === CELL_TYPE.EXPLORED_PATH) {
                        this.grid[cell[0]][cell[1]].type = CELL_TYPE.PATH;
                    } else if (this.grid[cell[0]][cell[1]].type === CELL_TYPE.BLOCKED || this.grid[cell[0]][cell[1]].type === CELL_TYPE.PENALTY ) {
                        this.grid[cell[0]][cell[1]].color = 'orange';
                    }
                    requestAnimationFrame(() => this.grid[cell[0]][cell[1]].paint())

                }

            }, 100);
            this.animating.push(inter2)
        }

        const paintPath = () => {
            this.clearAnimation()
            const gen = generator(fullExploredPath)
            const inter = setInterval(() => {
                const cell = gen.next().value
                if (!cell) {
                    clearInterval(inter)
                //Si no se ha podido llegar a todos los waypoints no pintar
                   if(sol) paintBestPath()
                } else {
                    if (this.grid[cell[0]][cell[1]].type === CELL_TYPE.BLANK) {
                        this.grid[cell[0]][cell[1]].type = CELL_TYPE.EXPLORED_PATH;
                        requestAnimationFrame(() => this.grid[cell[0]][cell[1]].paint())
                    }
                }
            }, 15);
            this.animating.push(inter)
        }
        paintPath()
    }
}

//export { Board };
