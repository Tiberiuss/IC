const CELL_TYPE = {
    BLANK: "BLANK",
    START: "START",
    END: "END",
    BLOCKED: "BLOCKED",
    PATH: "PATH",
    EXPLORED_PATH: "EXPLORED_PATH",
    WAYPOINT: "WAYPOINT",
};

const cell_type_from_string = (str) => {
    return CELL_TYPE?.[str] || CELL_TYPE.BLANK;
};

class Cell {
    constructor(board, i, j, x, y, w, id) {
        this.i = i;
        this.j = j;
        this.id = id;
        this.x = x;
        this.y = y;
        this.w = w;
        this.type = CELL_TYPE.BLANK;
        this.pintado = false;
        this.height = 0;
        this.color = null;
        /** @type {CanvasRenderingContext2D} */
        this.board = board;
    }

    reset() {
        this.type = CELL_TYPE.BLANK;
    }

    paint(user) {
        let ctx = this.board.ctx
        let images = this.board.images

        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 0.1;
        ctx.strokeStyle = "white";
        switch (this.type) {
            case CELL_TYPE.BLANK:
                ctx.fillStyle = "black";
                ctx.rect(this.x, this.y, this.w, this.w);

                ctx.fill();
                //ctx.stroke();
                break;
            case CELL_TYPE.START:
                ctx.fillStyle = "blue";
                ctx.strokeStyle = "white";
                ctx.lineWidth = 2;
                ctx.rect(this.x, this.y, this.w, this.w);
                ctx.fill();
                ctx.stroke();
                break;
            case CELL_TYPE.END:
                ctx.strokeStyle = "black";
                ctx.fillStyle = "yellow";
                ctx.rect(this.x, this.y, this.w, this.w);
                ctx.fill();
                ctx.stroke();
                break;
            case CELL_TYPE.BLOCKED:
                ctx.closePath();
                ctx.beginPath();
                let size;
                if (this.height <= 250) {
                    size = 10;
                } else if (this.height <= 750) {
                    size = 5;
                } else {
                    size = 1;
                }
                ctx.fillStyle = this.color ?? "black";
                ctx.rect(this.x, this.y, this.w, this.w);
                ctx.fill();
                ctx.drawImage(images["WALL"], this.x + size, this.y + size, this.w - 2 * size, this.w - 2 * size);
                ctx.strokeStyle = user.maxHeight > this.height ? "lightgreen" : "crimson";
                ctx.lineWidth = 2;

                //ctx.stroke();
                break;
            case CELL_TYPE.PATH:
                ctx.fillStyle = "orange";
                ctx.rect(this.x, this.y, this.w, this.w);
                ctx.fill();
                ctx.stroke();
                break;
            case CELL_TYPE.EXPLORED_PATH:
                ctx.fillStyle = "gray";
                ctx.rect(this.x, this.y, this.w, this.w);
                ctx.fill();
                ctx.stroke();

                break;
            case CELL_TYPE.WAYPOINT:
                ctx.fillStyle = "lightblue";
                ctx.rect(this.x, this.y, this.w, this.w);
                ctx.fill();
                ctx.stroke();
                break;
        }
        ctx.restore();
    }

    checkIn(x, y) {
        return x > this.x && x <= this.x + this.w && y > this.y && y <= this.y + this.w;
    }
}

//export { Cell, CELL_TYPE, cell_type_from_string };
