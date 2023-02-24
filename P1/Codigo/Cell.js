const CELL_TYPE = {
    BLANK: "BLANK",
    START: "START",
    END: "END",
    BLOCKED: "BLOCKED",
    PATH: "PATH",
    EXPLORED_PATH: "EXPLORED_PATH",
    WAYPOINT: "WAYPOINT"
};

const cell_type_from_string = (str) => {
    return CELL_TYPE?.[str] || CELL_TYPE.BLANK;
};

let img = new Image();
img.src = "sprite.png"


class Cell {
    constructor(ctx, i, j, x, y, w, id) {
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
        this.ctx = ctx;
    }

    reset() {
        this.type = CELL_TYPE.BLANK;
    }

    paint(user) {
        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.lineWidth = 0.1
        this.ctx.strokeStyle = "white";
        switch (this.type) {
            case CELL_TYPE.BLANK:
                this.ctx.fillStyle = "black";
                this.ctx.rect(this.x, this.y, this.w, this.w);

                this.ctx.fill();
                this.ctx.stroke();
                break;
            case CELL_TYPE.START:
                this.ctx.fillStyle = "blue";
                this.ctx.strokeStyle = "white";
                this.ctx.lineWidth = 2
                this.ctx.rect(this.x, this.y, this.w, this.w);
                this.ctx.fill();
                this.ctx.stroke();
                break;
            case CELL_TYPE.END:
                this.ctx.strokeStyle = "black";
                this.ctx.fillStyle = "yellow";
                this.ctx.rect(this.x, this.y, this.w, this.w);
                this.ctx.fill();
                this.ctx.stroke();
                break;
            case CELL_TYPE.BLOCKED:
                this.ctx.closePath()
                this.ctx.beginPath()
                let size;
                if (this.height <= 250) {
                    size = 10
                } else if (this.height <= 750) {
                    size = 5
                } else {
                    size = 1
                }
                this.ctx.fillStyle = this.color ?? "black";
                this.ctx.rect(this.x, this.y, this.w, this.w);
                this.ctx.fill()
                this.ctx.drawImage(img, this.x + size, this.y + size, this.w - (2 * size), this.w - (2 * size));
                this.ctx.strokeStyle = user.maxHeight > this.height ? "lightgreen" : "crimson";
                this.ctx.lineWidth = 2

                this.ctx.stroke()
                break;
            case CELL_TYPE.PATH:
                this.ctx.fillStyle = "orange";
                this.ctx.rect(this.x, this.y, this.w, this.w);
                this.ctx.fill();
                this.ctx.stroke();
                break;
            case CELL_TYPE.EXPLORED_PATH:
                this.ctx.fillStyle = "gray";
                this.ctx.rect(this.x, this.y, this.w, this.w);
                this.ctx.fill();
                this.ctx.stroke();
                break;
            case CELL_TYPE.WAYPOINT:
                this.ctx.fillStyle = "lightblue";
                this.ctx.rect(this.x, this.y, this.w, this.w);
                this.ctx.fill();
                this.ctx.stroke();
                break;
        }
        this.ctx.restore();
    }

    checkIn(x, y) {
        return x > this.x && x <= this.x + this.w && y > this.y && y <= this.y + this.w;
    }
}

//export { Cell, CELL_TYPE, cell_type_from_string };
