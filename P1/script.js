let canvas = document.querySelector('canvas')
canvas.width=300
canvas.height=300
const COLS = 30
const ROWS = 30

let ctx = canvas.getContext('2d')
ctx.strokeStyle = 'white'
ctx.fillStyle = 'black'
ctx.fillRect(0,0,600,600)

class Celda {
    constructor (x, y, w) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.pintado = false;
      }

    pintar() {
        ctx.save()
        if(this.pintado) {
            ctx.fillStyle = 'yellow'
            ctx.fillRect(this.x,this.y,this.w,this.w)
        }else {
            ctx.strokeRect(this.x,this.y,this.w,this.w)
        }
        ctx.restore()
    }
    
    checkIn(x,y) {
        return x > this.x && x < this.x+this.w && y > this.y && y < this.y + this.w;
    }
}

function pintar(){
    ctx.fillRect(0,0,600,600)
    for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
           grid[i][j].pintar()
        }
    }
}

let grid = new Array(COLS)
for (let i = 0; i < COLS; i++) {
    grid[i] = new Array(ROWS)
    for (let j = 0; j < ROWS; j++) {
       grid[i][j] = new Celda(i*20,j*20,20,20)
    }
}

pintar()

canvas.addEventListener('click',(event) => {
    let rect = canvas.getBoundingClientRect();
    let mouseX =event.x - rect.left;
    let mouseY = event.y - rect.top;
    for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
            if(grid[i][j].checkIn(mouseX,mouseY)){
                grid[i][j].pintado = !grid[i][j].pintado
            }
        }
    }
    pintar()
})