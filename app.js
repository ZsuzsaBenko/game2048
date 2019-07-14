import { game } from './game.js';
import { view } from "./view.js";

view.createGameGrid();
game.startGame();
view.displayGameGrid();
view.perceiveArrows();


