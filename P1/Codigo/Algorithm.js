const DIAG_DIST = Math.sqrt(2);
const CARDINAL_DIST = 1;
const dirs = [
    [-1, -1, DIAG_DIST],
    [-1, 0, CARDINAL_DIST],
    [-1, 1, DIAG_DIST],
    [0, -1, CARDINAL_DIST],
    [0, 1, CARDINAL_DIST],
    [1, -1, DIAG_DIST],
    [1, 0, CARDINAL_DIST],
    [1, 1, DIAG_DIST],
];

class GraphNode {
    constructor(i, j, g, h, parent, id) {
        this.i = i;
        this.j = j;
        this.g = g; // Distancia al comienzo
        this.h = h; // Heuristica
        this.parent = parent; //Antecesor
        this.id = id;
    }

    f() {
        return this.g + this.h;
    }
}

class AStar {
    constructor(grid, rows, cols, user) {
        this.grid = grid;
        this.rows = rows;
        this.cols = cols;
        this.user = user;
    }

    // Distancia
    h(a, b) {
        return Math.sqrt(Math.pow(b.i - a.i, 2) + Math.pow(b.j - a.j, 2));
    }

    getDirs() {
        return dirs;
    }

    inBounds(x, y) {
        //Comprobar que no sale del tablero
        return x < this.cols && x >= 0 && y < this.rows && y >= 0;
    }

    getNeighbours(nodo) {
        const neighbours = [];
        for (const [dx, dy, dist] of this.getDirs()) {
            if (this.inBounds(nodo.i + dx, nodo.j + dy)) {
                const celdaAdyacente = this.grid[nodo.i + dx][nodo.j + dy];
                if (celdaAdyacente.type === CELL_TYPE.USER_BLOCKED && celdaAdyacente.isWalkable() || (celdaAdyacente.type !== CELL_TYPE.BLOCKED && celdaAdyacente.type !== CELL_TYPE.USER_BLOCKED)) {
                    neighbours.push([celdaAdyacente, dist, celdaAdyacente.peso]);
                }
            }
        }
        return neighbours;
    }

    search(startN, endNode) {
        let startNode = new GraphNode(startN.i, startN.j, 0, this.h(startN, endNode), null, startN.id);
        const abierta = [startNode];
        const cerrada = {};
        const explored_path = []
        let solucion = false;
        let nodoEnd = null;

        while (abierta.length !== 0) {

            //Mientras 
            const indexRemove = abierta.reduce((prev, current, index) => (abierta[prev].f() < abierta[index].f() ? prev : index), 0);
            const [nodoMejor] = abierta.splice(indexRemove, 1);
            if (nodoMejor.i === endNode.i && nodoMejor.j === endNode.j) {
                nodoEnd = nodoMejor;
                solucion = true
                break;
            };
            for (const [celdaAdyacente, dist, peso] of this.getNeighbours(nodoMejor)) {
                let new_cost = nodoMejor.g + dist + peso;
                let nodoCerrada = cerrada[celdaAdyacente.id];
                let nodoAbierta = abierta.find((nodo) => nodo.i === celdaAdyacente.i && nodo.j === celdaAdyacente.j);
                let nodo = null;

                // 5. El nodo adyacente no esta ni en la lista abierta ni en cerrada
                if (!nodoCerrada && !nodoAbierta) {
                    nodo = new GraphNode(celdaAdyacente.i, celdaAdyacente.j, null, null, nodoMejor, celdaAdyacente.id);
                    nodo.g = new_cost;
                    nodo.h = this.h(nodo, endNode);
                    explored_path.push([nodo.i, nodo.j]);
                    abierta.push(nodo);
                }


                else {
                    // Casos 3 y 4: El nodo adyacente puede estar en la abierta o en la cerrada
                    nodo = nodoCerrada || nodoAbierta

                    // Reevaluamos el conflicto y actualizamos el nodo en caso que el camino sea mejor
                    if (new_cost < nodo.g) {
                        nodo.g = new_cost
                        nodo.parent = nodoMejor
                    }
                }
            }
            cerrada[nodoMejor.id] = nodoMejor;

        }
        let path = [];
        if (nodoEnd) {
            // Si ha llegado al final, recuperar el camino minimo
            let curr = nodoEnd;
            while (curr !== null) {
                path.push([curr.i, curr.j]);
                curr = curr.parent;
            }
            path.shift();
            path.pop();
        }
        return [path.reverse(), explored_path, solucion];

    }
}
