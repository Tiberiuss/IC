//import { Board } from "./Board.js";
//import { cell_type_from_string } from "./Cell.js";

function main() {
    let board = new Board(11, 11, 50,0);
    board.create();

    let btn_tipo_celda = document.querySelector("#cellType");
    let btn_start_sim = document.querySelector("#start");
    let btn_reset_sim = document.querySelector("#reset");
    let btn_blocked_selector = document.querySelector("#blocked_selector");
    board.blocked_height = btn_blocked_selector.value;

    btn_blocked_selector.addEventListener("change", (e) => {
        board.blocked_height = e.target.value;
    });

    btn_tipo_celda.addEventListener("click", (e) => {
        if (e.target.tagName !== "DIV" && e.target.tagName !== "SELECT") {
            document.querySelectorAll(".active").forEach((el) => el.classList.remove("active"));
            e.target.classList.add("active");
            board.selected_cell = cell_type_from_string(e.target.value);
        } else if (e.target.tagName === "SELECT") {
            document.querySelectorAll(".active").forEach((el) => el.classList.remove("active"));
            e.target.parentElement.classList.add("active");
            board.selected_cell = cell_type_from_string(e.target.parentElement.value);
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
