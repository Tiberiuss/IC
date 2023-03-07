const CELL_TYPE = {
    BLANK: "BLANK",
    START: "START",
    END: "END",
    BLOCKED: "BLOCKED",
    USER_BLOCKED: "USER_BLOCKED",
    PATH: "PATH",
    EXPLORED_PATH: "EXPLORED_PATH",
    WAYPOINT: "WAYPOINT",
    PENALTY: "PENALTY",
};

const cell_type_from_string = (str) => {
    return CELL_TYPE?.[str] || CELL_TYPE.BLANK;
};

class Cell {
    constructor(board, i, j, x, y, w, id, peso = 0) {
        this.i = i;
        this.j = j;
        this.id = id;
        this.x = x;
        this.y = y;
        this.w = w;
        this.peso = peso;
        this.type = CELL_TYPE.BLANK;
        this.height = 0;
        this.color = null;
        this.blocked_type = null;
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
                ctx.drawImage(images["WALL"], this.x, this.y, this.w, this.w);
                break;
            case CELL_TYPE.USER_BLOCKED:
                ctx.closePath();
                ctx.beginPath();
                let img;
                switch (this.blocked_type) {
                    case 0:
                        img = images["TRAP"]
                        break;
                    case 1:
                        img = images["LAVA"]
                        break;
                    case 2:
                        img = images["ANGEL"]
                        break;
                    default:
                        break;
                }
                ctx.fillStyle = this.color ?? "black";
                ctx.rect(this.x, this.y, this.w, this.w);
                ctx.fill();
                ctx.drawImage(img, this.x, this.y, this.w, this.w);
                ctx.strokeStyle = user.maxHeight.includes[this.blocked_type] ? "lightgreen" : "crimson";
                ctx.lineWidth = 2;
                ctx.stroke();
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
            case CELL_TYPE.PENALTY:
                ctx.strokeStyle = "yellow";
                ctx.lineWidth = 1.5
                ctx.rect(this.x, this.y, this.w, this.w);
                ctx.font = this.w/3 + 'px courier'
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillStyle = this.color ?? "black";
                ctx.fill();
                ctx.fillStyle = 'white'
                ctx.fillText(this.peso, this.x + this.w/2,this.y + this.w/2)
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
