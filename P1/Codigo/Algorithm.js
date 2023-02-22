const DIAG_DIST = Math.sqrt(2);
const CARDIANL_DIST = 1;
const dirs = [
    [-1, -1, DIAG_DIST],
    [-1, 0, CARDIANL_DIST],
    [-1, 1, DIAG_DIST],
    [0, -1, CARDIANL_DIST],
    [0, 1, CARDIANL_DIST],
    [1, -1, DIAG_DIST],
    [1, 0, CARDIANL_DIST],
    [1, 1, DIAG_DIST],
];

class GraphNode {
    constructor(i, j, g, h, parent) {
        this.i = i;
        this.j = j;
        this.g = g; // Distancia al comienzo
        this.h = h; // Heuristica
        this.parent = parent; //Antecesor
    }

    f() {
        return this.g + this.h;
    }
}

class AStar {
    constructor(grid, rows, cols) {
        this.grid = grid;
        this.rows = rows;
        this.cols = cols;
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
        return x < this.rows && x >= 0 && y < this.cols && y >= 0;
    }

    getNeighbours(nodo) {
        const neighbours = [];
        for (const [dx, dy, dist] of this.getDirs()) {
            if (this.inBounds(nodo.i + dx, nodo.j + dy)) {
                const celdaAdyacente = this.grid[nodo.i + dx][nodo.j + dy];
                if (celdaAdyacente.type === CELL_TYPE.BLANK || celdaAdyacente.type === CELL_TYPE.END) {
                    neighbours.push([celdaAdyacente,dist]);
                }
            }
        }
        return neighbours;
    }

    search(startN, endNode) {
        let startNode = new GraphNode(startN.i, startN.j, 0, this.h(startN, endNode), null);
        const abierta = [startNode];
        const cerrada = [];
        const explored_path = []
        let nodoEnd = null;
        while (abierta.length !== 0) {
            const indexRemove = abierta.reduce((prev, current, index) => (abierta[prev].f() < abierta[index].f() ? prev : index), 0);
            const [nodoMejor] = abierta.splice(indexRemove, 1);

            if (nodoMejor.i === endNode.i && nodoMejor.j === endNode.j) {
                nodoEnd = nodoMejor;
                break;
            };

            for (const [celdaAdyacente, dist] of this.getNeighbours(nodoMejor)) {
                let new_cost = nodoMejor.g + dist;
                let nodoCerrada = cerrada.find((nodo) => nodo.i === celdaAdyacente.i && nodo.j === celdaAdyacente.j);
                if (!nodoCerrada){
                    nodoCerrada = new GraphNode(celdaAdyacente.i, celdaAdyacente.j, null, null, nodoMejor);
                    nodoCerrada.g = dist;
                    nodoCerrada.h = this.h(nodoCerrada, endNode);
                    explored_path.push([nodoCerrada.i, nodoCerrada.j]);
                    abierta.push(nodoCerrada);
                }
                
                if(new_cost < celdaAdyacente.g) {
                    nodoCerrada.g = new_cost
                }
                

                /* let nodoAbierta = abierta.find((nodo) => nodo.i === celdaAdyacente.i && nodo.j === celdaAdyacente.j);
                if (nodoAbierta) {
                    // nodoAbierta => nodo adyacente al expandido dentro de la lista   nodoMejor => nodo expandido
                    // 1. Esta en abierta
                    const gReorientacion = nodoMejor.g + dist;
                    if (nodoAbierta.g > gReorientacion) {
                        nodoAbierta.parent = nodoMejor; //El camino nuevo es mejor y se reorienta el enlace
                        nodoAbierta.g = gReorientacion;
                    }
                } else {
                    // 2. No esta en abierta
                    let nodoCerrada = cerrada.find((nodo) => nodo.i === celdaAdyacente.i && nodo.j === celdaAdyacente.j);
                    if (nodoCerrada) {
                        // 3. Esta en cerrada
                        continue;
                    } else {
                        // 5. No esta en abierta ni cerrada
                        let nodoAdyacente = new GraphNode(celdaAdyacente.i, celdaAdyacente.j, null, null, nodoMejor);
                        nodoAdyacente.g = dist;
                        nodoAdyacente.h = this.h(nodoAdyacente, endNode);
                        abierta.push(nodoAdyacente);
                    }
                } */
            }
            cerrada.push(nodoMejor);
        }

        let path;
        if(nodoEnd) {
            // Si ha llegado al final, recuperar el camino minimo
            path = [];
            let curr = nodoEnd;
            while (curr !== null) {
                path.push([curr.i, curr.j]);
                curr = curr.parent;
            }
            path.shift();
            path.pop();
        }
        return [path,explored_path];

    }
}
