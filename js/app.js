import { game } from './game.js';
import { view } from "./view.js";


function main() {
    let size = 16;

    const sizeSelector = document.querySelector("#gridSize");
    sizeSelector.addEventListener("change", function(event) {
        size = Math.pow(parseInt(sizeSelector.value), 2);
        view.destroyGrid();
        game.destroyGame();
        sizeSelector.blur();

        game.initGame(size);
        view.createGameGrid();
        view.displayGameGrid();
    });

    if (size !== 16) return;

    game.initGame(16);
    view.createGameGrid();
    view.displayGameGrid();
    view.listenToArrows();
}

main();


