import {game} from './game.js';


export const view = {
    container: document.querySelector("#game-container"),

    createGameGrid: function() {
        for (let i = 0; i < game.gridNumber; i++) {
            let grid = document.createElement("div");
            grid.style.width = "150px";
            grid.style.height = "150px";
            grid.style.border = "1px solid black";
            grid.setAttribute("id", `${i}`);
            this.container.appendChild(grid);
        }
    },

    displayGameGrid: function() {
        for (let i = 0; i < game.gridNumber; i++) {
            const grid = document.getElementById(`${i}`);
            if (game.gameGrid[i].value !== 0) {
                grid.innerText = game.gameGrid[i].value;
            }
        }
    }
};
