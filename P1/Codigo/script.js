//import { Board } from "./Board.js";
//import { cell_type_from_string } from "./Cell.js";

function main() {
    let board = new Board(11, 11, 50,0);
    board.create();

    let btn_tipo_celda = document.querySelectorAll(".cell");
    let btn_start_sim = document.querySelector("#start");
    let btn_reset_sim = document.querySelector("#reset");
    let btn_generate_maze = document.querySelector("#generateMaze");
    let btn_generate_board = document.querySelector("#generateBoard");
    let user_selector = document.querySelectorAll(".userBtn");
    let blocked_selector = document.querySelectorAll(".obstacleBtn");
    let btn_penalty_selector = document.querySelector("#penalty_selector");
    let activeSelected;

    user_selector.forEach(el => {
      el.addEventListener("click", (e) => {
        user_selector.forEach(element => element.classList.remove('active'))  
        e.currentTarget.classList.add('active')
        board.user_type = USER_TYPE[e.currentTarget.value];
        board.paint()        
    });
  
    })
    blocked_selector.forEach(el => {
        el.addEventListener("click", (e) => {
            board.blocked_type = BLOCKED_TYPE[e.currentTarget.value];
        });
    })

    btn_penalty_selector.addEventListener("change", (e) => {
        board.peso = e.target.valueAsNumber;
    });

    btn_tipo_celda.forEach(el => {
        el.addEventListener("click", (e) => {
            if (activeSelected) {
                activeSelected.classList.remove("active")
            }
            e.currentTarget.classList.add("active");
            board.selected_cell = cell_type_from_string(e.currentTarget.dataset.cellType);
            activeSelected = e.currentTarget;
        });

    });

    btn_start_sim.addEventListener("click", () => {
        board.start();
    });

    btn_reset_sim.addEventListener("click", () => {
        board.reset();
        board.clearAnimation()
        board.paint();
    });

    btn_generate_maze.addEventListener("click", () => {
        board.reset();
        board.generateMaze();
        board.paint();
    });

    btn_generate_board.addEventListener("click",() => {
        let filas = document.querySelector("#filas").valueAsNumber
        let columnas = document.querySelector("#columnas").valueAsNumber
        board = new Board(filas, columnas, 50,0);
        board.create();
    })
}

main();
