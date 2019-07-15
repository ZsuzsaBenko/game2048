import { game } from './game.js';
import { view } from "./view.js";


const main = function() {
    let size = 16;
    const sizeSelect = document.querySelector("#gridSize");
    sizeSelect.addEventListener("change", function(event) {
        size = Math.pow(parseInt(sizeSelect.value), 2);
        view.destroyGrid();
        game.destroyGame();
        sizeSelect.blur();

        game.initGame(size);
        view.createGameGrid();
        view.displayGameGrid();
    });

    if (size !== 16) return;

    game.initGame(16);
    view.createGameGrid();
    view.displayGameGrid();
    view.perceiveArrows();
};

main();


