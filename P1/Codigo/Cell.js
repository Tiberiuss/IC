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

const USER_TYPE = {
    HUMAN:"HUMAN",
    ANGEL:"ANGEL",
    GIANT:"GIANT",
}

const BLOCKED_TYPE = {
    SPIKES:"SPIKES",
    LAVA:"LAVA",
    BOMB:"BOMB",
}

const BLOCKED_INMUNE = {
    SPIKES: [USER_TYPE.HUMAN,USER_TYPE.ANGEL],
    LAVA: [USER_TYPE.ANGEL],
    BOMB: [USER_TYPE.GIANT,USER_TYPE.ANGEL]
}

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
        this.board.ctx.fillStyle = 'black'
        this.board.ctx.fillRect(this.x,this.y,this.w,this.w)
        this.type = CELL_TYPE.BLANK;
    }

    paint() {
        let ctx = this.board.ctx
        let images = this.board.images
 
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 0.1;
        ctx.strokeStyle = "white";
        switch (this.type) {
            case CELL_TYPE.BLANK:
                ctx.fillStyle = "black";
                ctx.strokeStyle = "black";
                ctx.lineWidth = 2
                ctx.rect(this.x, this.y, this.w, this.w);
                ctx.stroke()
                ctx.fill();
                //ctx.stroke();
                break;
            case CELL_TYPE.START:
                switch (this.board.user_type) {
                    case USER_TYPE.HUMAN:
                        ctx.drawImage(images["HUMAN"], this.x, this.y, this.w, this.w);
                        break;
                    case USER_TYPE.GIANT:
                        ctx.drawImage(images["GIANT"], this.x, this.y, this.w, this.w);
                        break;
                    case USER_TYPE.ANGEL:
                        ctx.drawImage(images["ANGEL"], this.x, this.y, this.w, this.w);
                        break;
                }
                ctx.strokeStyle = "blue";
                ctx.lineWidth = 2;
                ctx.rect(this.x, this.y, this.w, this.w);
                ctx.stroke();
                break;
            case CELL_TYPE.END:
                ctx.drawImage(images["BOX"], this.x, this.y, this.w, this.w);
                ctx.strokeStyle = "yellow";
                ctx.lineWidth = 2;
                ctx.rect(this.x, this.y, this.w, this.w);
                ctx.stroke();
                break;
            case CELL_TYPE.BLOCKED:
                ctx.drawImage(images["WALL"], this.x, this.y, this.w, this.w);
                break;
            case CELL_TYPE.USER_BLOCKED:
                ctx.fillStyle = this.color ?? "black";
                ctx.rect(this.x, this.y, this.w, this.w);
                ctx.fill();
                switch (this.blocked_type) {
                    case BLOCKED_TYPE.SPIKES:
                        ctx.drawImage(images["TRAP"], this.x, this.y, this.w, this.w);
                        break;
                    case BLOCKED_TYPE.LAVA:
                        ctx.drawImage(images["LAVA"], this.x, this.y, this.w, this.w);
                        break;
                    case BLOCKED_TYPE.BOMB:
                        ctx.drawImage(images["BOMB"], this.x, this.y, this.w, this.w);
                        break;
                }
                ctx.strokeStyle = this.isWalkable() ? "lightgreen" : "crimson";
                ctx.lineWidth = 2;
                ctx.stroke();
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

                ctx.drawImage(images["KEY"], this.x, this.y, this.w, this.w);

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

    isWalkable() {
        if (this.type === CELL_TYPE.USER_BLOCKED) {
            return BLOCKED_INMUNE?.[this.blocked_type].includes(this.board.user_type);
        }
        return true
    }
}

//export { Cell, CELL_TYPE, cell_type_from_string };
