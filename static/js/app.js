import { game } from './game.js';
import { view } from "./view.js";


function main() {
    game.initGame(game.sizes.NORMAL);

    view.createGameGrid();
    view.displayGameGrid();
    view.listenToArrows();
    view.listenToTouchScreenEvents();

    view.undoMove();
    view.playNewGame();
    view.chooseSize();

    view.resetSizeSelector();
}

main();


