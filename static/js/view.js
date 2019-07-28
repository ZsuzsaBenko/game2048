import {game} from './game.js';


export const view = {
    container: document.querySelector("#game-container"),
    winNumber: 128,

    createGameGrid: function() {
        this.container.style.width = `${8 * Math.sqrt(game.gridNumber)}vw`;
        this.container.style.height = `${8 * Math.sqrt(game.gridNumber)}vw`;
        for (let i = 0; i < game.gridNumber; i++) {
            let grid = document.createElement("div");
            grid.style.boxSizing = "border-box";
            grid.style.width = "8vw";
            grid.style.height = "8vw";
            grid.style.border = "1px solid black";
            grid.setAttribute("id", `${i}`);
            this.container.appendChild(grid);
        }
    },

    displayGameGrid: function() {
        for (let i = 0; i < game.gridNumber; i++) {
            const grid = document.getElementById(`${i}`);
            grid.innerText = '';
            grid.style.backgroundColor = "gainsboro";
            if (game.gameGrid[i].value !== 0) {
                grid.innerText = game.gameGrid[i].value;
                this.colorGrid(grid);
            }
        }
        let maxNumber = Math.max(...game.gameGrid.map(grid => grid.value));
        if (maxNumber >= this.winNumber) {
            this.sendCongratulationsMessage(maxNumber);
        }
        if (game.isGameOver())  {
            this.displayPopup();
        }
    },

    colorGrid: function(grid) {
        const colors = ["lightblue", "lightcoral", "palegreen", "gold", "slateblue", "forestgreen", "orange",
            "rebeccapurple", "crimson", "tan", "greenyellow", "indigo", "rosybrown", "turquoise"];
        for(let i = 1; i <= colors.length; i++) {
            if (grid.textContent === `${Math.pow(2, i)}`) {
                grid.style.backgroundColor = colors[i-1];
            }
        }
    },

    sendCongratulationsMessage: function(number) {
        const message = `You have reached ${number}! Congratulations!`;
        const messageParagraph = document.querySelector("#message");
        messageParagraph.textContent = message;
        messageParagraph.style.display = "block";
    },

    displayPopup: function() {
        const popup = document.querySelector("#popup");
        const popupCloseButton = popup.querySelector("span");
        popup.style.display = "block";
        popupCloseButton.addEventListener("click", function (event) {
            popup.style.display = "none";
        });
    },

    listenToArrows: function() {
        window.addEventListener("keyup", function (event) {
            switch (event.key) {
                case "ArrowLeft":
                    game.moveLeft();
                    break;
                case "ArrowRight":
                    game.moveRight();
                    break;
                case "ArrowUp":
                    game.moveUp();
                    break;
                case "ArrowDown":
                    game.moveDown();
                    break;
            }
            view.displayGameGrid();
        });
    },

    listenToTouchScreenEvents() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;

        window.addEventListener('touchstart', function(event){
            let touchObj = event.changedTouches[0];
            startX = touchObj.clientX;
            startY = touchObj.clientY;
            event.preventDefault()
        }, false);

        window.addEventListener('touchend', function(event){
            let touchObj = event.changedTouches[0];
            endX = touchObj.clientX;
            endY = touchObj.clientY;

            let distanceLeft = startX - endX;
            let distanceRight = endX - startX;
            let distanceUp = startY - endY;
            let distanceDown = endY - startY;

            event.preventDefault();

            if (distanceLeft > distanceRight && distanceLeft > distanceDown && distanceLeft > distanceUp) {
                game.moveLeft();
            } else if (distanceRight > distanceLeft && distanceRight > distanceDown && distanceRight > distanceUp) {
                game.moveRight();
            } else if (distanceUp > distanceDown && distanceUp > distanceLeft && distanceUp > distanceRight) {
                game.moveUp();
            } else if (distanceDown > distanceUp && distanceDown > distanceLeft && distanceDown > distanceRight) {
                game.moveDown();
            }

            view.displayGameGrid();
        }, false);

    },

    undoMove: function() {
        const undoButton = document.querySelector("#undoButton");
        undoButton.addEventListener("click", function (event) {
           game.undo();
           view.displayGameGrid();
        });
    },

    playNewGame: function() {
        const newGameButton = document.querySelector("#newGameButton");
        newGameButton.addEventListener("click", function (event) {
            let size = game.gameGrid.length;
            view.restart(size);
        });
    },

    chooseSize: function() {
        const sizeSelector = document.querySelector("#gridSize");
        sizeSelector.addEventListener("change", function(event) {
            let size = Math.pow(parseInt(sizeSelector.value), 2);
            sizeSelector.blur();
            view.restart(size);
        });
    },

    restart: function(size) {
        this.destroyView();
        game.destroyGame();

        game.initGame(size);
        this.createGameGrid();
        this.displayGameGrid();
    },

    destroyView: function() {
        this.container.innerHTML = "";
        document.querySelector("#message").style.display = "none";
    }
};
