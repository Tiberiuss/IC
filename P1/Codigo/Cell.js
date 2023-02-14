const CELL_TYPE = {
    BLANK: "BLANK",
    START: "START",
    END: "END",
    BLOCKED: "BLOCKED",
};

const cell_type_from_string = (str) => {
    return CELL_TYPE?.[str] || CELL_TYPE.BLANK;
};

class Cell {
    constructor(ctx, x, y, w) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.type = CELL_TYPE.BLANK;
        this.pintado = false;
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx;
    }

    reset() {
        this.type = CELL_TYPE.BLANK;
    }

    paint() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.w, this.w);
        this.ctx.lineWidth = 0.1
        this.ctx.strokeStyle = "white";
        switch (this.type) {
            case CELL_TYPE.BLANK:
                this.ctx.fillStyle = "black";
                break;
            case CELL_TYPE.START:
                this.ctx.fillStyle = "blue";
                break;
            case CELL_TYPE.END:
                this.ctx.strokeStyle = "black";
                this.ctx.fillStyle = "yellow";
                break;
            case CELL_TYPE.BLOCKED:
                this.ctx.fillStyle = "red";
                break;
        }
        this.ctx.fill();
        this.ctx.stroke();
    }

    checkIn(x, y) {
        return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w;
    }
}

//export { Cell, CELL_TYPE, cell_type_from_string };
