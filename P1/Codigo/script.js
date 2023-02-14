const COLS = 10
const ROWS = 10
const CELLSIZE = 50;

const WIDTH = COLS * CELLSIZE
const HEIGHT = ROWS * CELLSIZE

let tipo_celda = document.querySelector('#cellType')
let start_sim = document.querySelector('#start')
let reset_sim = document.querySelector('#reset')
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
let SELECTED_CELL = CELL_TYPE.BLANK
canvas.width = WIDTH
canvas.height = HEIGHT

tipo_celda.addEventListener('click', (e) => {
    console.log(e.target.tagName);
    if (e.target.tagName !== 'DIV') {
        console.log(e.target)
        document.querySelectorAll('.active').forEach(el => el.classList.remove('active'))
        e.target.classList.add('active')
        SELECTED_CELL = fromString(e.target.value)
    }
})

start_sim.addEventListener('click', () => {
    start()
})

reset_sim.addEventListener('click', () => {
    reset()
})

function pintar() {
    ctx.strokeStyle = 'white'
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
            grid[i][j].pintar()
        }
    }
}


canvas.addEventListener('click', (event) => {
    let rect = canvas.getBoundingClientRect();
    let mouseX = event.x - rect.left;
    let mouseY = event.y - rect.top;
    for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
            if (grid[i][j].checkIn(mouseX, mouseY)) {
                if (grid[i][j].type === SELECTED_CELL) {
                    grid[i][j].type = CELL_TYPE.BLANK
                } else {
                    grid[i][j].type = SELECTED_CELL
                }
            }
        }
    }
    pintar()
})

let grid = makeGrid()

function makeGrid() {
    let grid = new Array(COLS)
    for (let i = 0; i < COLS; i++) {
        grid[i] = new Array(ROWS)
        for (let j = 0; j < ROWS; j++) {
            grid[i][j] = new Cell(i * CELLSIZE, j * CELLSIZE, CELLSIZE, CELLSIZE)
        }
    }
    return grid;
}

function reset() {
    grid = makeGrid()
    pintar()
}

function start() {
    console.log("ALGORITMO GUAPO");
}


pintar()
