const CELL_TYPE = {
    BLANK: "BLANK",
    START: "START",
    END: "END",
    BLOCKED: "BLOCKED",
}

const fromString = (str) => {
    switch (str) {
        case CELL_TYPE.BLANK:
            return CELL_TYPE.BLANK
            break;
        case CELL_TYPE.START:
            return CELL_TYPE.START
            break;
        case CELL_TYPE.END:
            return CELL_TYPE.END
            break;
        case CELL_TYPE.BLOCKED:
            return CELL_TYPE.BLOCKED
            break;
        default:
            break;
    }
}

class Cell {
    constructor(x, y, w) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.type = CELL_TYPE.BLANK
        this.pintado = false;
    }

    pintar() {
        console.log(this.type);
        switch (this.type) {
            case CELL_TYPE.BLANK:
                ctx.strokeStyle = 'white'
                ctx.strokeRect(this.x, this.y, this.w, this.w)
                break;
            case CELL_TYPE.START:
                ctx.fillStyle = 'blue'
                ctx.fillRect(this.x, this.y, this.w, this.w)
                break;
            case CELL_TYPE.END:
                ctx.fillStyle = 'yellow'
                ctx.fillRect(this.x, this.y, this.w, this.w)
                break;
            case CELL_TYPE.BLOCKED:
                ctx.fillStyle = 'red'
                ctx.fillRect(this.x, this.y, this.w, this.w)
                break;
        }
    }

    checkIn(x, y) {
        return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w;
    }
}
