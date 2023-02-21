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
            grid[i][j] = new Cell(ctx, i, j, i * cellSize, j * cellSize, cellSize, j * grid.length + i);
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
                                this.endNode = this.grid[i][j];
                                //this.endNode[this.grid[i][j].id] = this.grid[i][j]
                            }
                            this.grid[i][j].type = this.selected_cell;
                        }
                    }
                }
            }
            console.log(this.startNode);
            console.log(this.endNode);
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

    // Distancia 
    h(a, b) {
        return Math.sqrt(Math.pow(b.i - a.i, 2) + Math.pow(b.j - a.j, 2))
    }

    start() {
        let startNode = new GraphNode(this.startNode.i, this.startNode.j, 0, this.h(this.startNode, this.endNode), null)
        const abierta = [startNode];
        const cerrada = [];
        let solucion = false;
        const path = [];
        while (abierta.length !== 0 && !solucion) {
            console.log("BUCLE");
            const indexRemove = abierta.reduce((prev, current, index) => (abierta[prev].f() < abierta[index].f()) ? prev : index, 0);
            const [nodoMejor] = abierta.splice(indexRemove, 1);
            if (nodoMejor.i === this.endNode.i && nodoMejor.j === this.endNode.j) { // Si ha llegado al final, recuperar el camino minimo
                let curr = nodoMejor;
                solucion = true;
                while (curr !== null) {
                    path.push([curr.i, curr.j])
                    curr = curr.parent
                }
                continue;
            }
            const dirs = [[-1, -1, Math.sqrt(2)], [-1, 0, 1], [-1, 1, Math.sqrt(2)], [0, -1, 1], [0, 1, 1], [1, -1, Math.sqrt(2)], [1, 0, 1], [1, 1, Math.sqrt(2)]]
            for (const [dx, dy, dist] of dirs) {
                if (nodoMejor.i + dx < this.rows && nodoMejor.i + dx >= 0 && nodoMejor.j + dy < this.cols && nodoMejor.j + dy >= 0) { //Comprobar que no sale del tablero
                    let celdaAdyacente = this.grid[nodoMejor.i + dx][nodoMejor.j + dy]
                    if (celdaAdyacente.type === CELL_TYPE.BLANK || celdaAdyacente.type === CELL_TYPE.END) {
                    //this.grid[celdaAdyacente.i][celdaAdyacente.j].type = CELL_TYPE.PATH;

                        let nodoAbierta = abierta.find(nodo => nodo.i === celdaAdyacente.i && nodo.j === celdaAdyacente.j)
                        if (nodoAbierta) {  // nodoAbierta => nodo adyacente al expandido dentro de la lista   nodoMejor => nodo expandido
                            // 1. Esta en abierta
                            const gReorientacion = nodoMejor.g + dist
                            if (nodoAbierta.g > gReorientacion) {
                                nodoAbierta.parent = nodoMejor;  //El camino nuevo es mejor y se reorienta el enlace
                                nodoAbierta.g = gReorientacion;
                            }
                        } else {
                            // 2. No esta en abierta
                            let nodoCerrada = cerrada.find(nodo => nodo.i === celdaAdyacente.i && nodo.j === celdaAdyacente.j)
                            if (nodoCerrada) {
                                // 3. Esta en cerrada
                                continue;
                            } else {
                                // 5. No esta en abierta ni cerrada
                                let nodoAdyacente = new GraphNode(celdaAdyacente.i, celdaAdyacente.j, null, null, nodoMejor)
                                nodoAdyacente.g = dist
                                nodoAdyacente.h = this.h(nodoAdyacente, this.endNode)
                                abierta.push(nodoAdyacente)
                            }

                        }
                    }
                }
            }
            cerrada.push(nodoMejor);
        }
        console.log(path);
        for (let [i, j] of path) {
            this.grid[i][j].type = CELL_TYPE.PATH;
        }
        this.paint()
    }
}

//export { Board };
