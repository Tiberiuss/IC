import { Board } from "./Board.js";
import { cell_type_from_string } from "./Cell.js";

function main() {
    let board = new Board(10, 10, 50);
    board.create();
    board.paint();

    let btn_tipo_celda = document.querySelector("#cellType");
    let btn_start_sim = document.querySelector("#start");
    let btn_reset_sim = document.querySelector("#reset");

    btn_tipo_celda.addEventListener("click", (e) => {
        if (e.target.tagName !== "DIV") {
            document.querySelectorAll(".active").forEach((el) => el.classList.remove("active"));
            e.target.classList.add("active");
            board.selected_cell = cell_type_from_string(e.target.value);
        }
    });

    btn_start_sim.addEventListener("click", () => {
        board.start();
    });

    btn_reset_sim.addEventListener("click", () => {
        board.reset();
        board.paint();
    });
}

main();
