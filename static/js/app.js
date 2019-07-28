import { game } from './game.js';
import { view } from "./view.js";


function main() {
    let size = 16;
    game.initGame(size);

    view.createGameGrid();
    view.displayGameGrid();
    view.listenToArrows();
    view.listenToTouchScreenEvents();

    view.undoMove();
    view.playNewGame();
    view.chooseSize();
}

main();


