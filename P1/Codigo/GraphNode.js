class GraphNode {
    constructor(i,j,g,h,parent) {
        this.i=i;
        this.j=j;
        this.g = g; // Distancia al comienzo
        this.h = h; // Heuristica
        this.parent = parent;  //Antecesor 
    }

    f() {
        return this.g + this.h;
    }
}