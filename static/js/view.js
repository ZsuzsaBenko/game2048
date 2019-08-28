import {game} from './game.js';


export const view = {
    container: document.querySelector("#game-container"),
    winNumber: 2048,

    createGameGrid: function() {
        let cell;

        for (let i = 0; i < game.gridSize; i++) {
            cell = document.createElement("div");
            this.defineCellSize(cell);
            cell.style.boxSizing = "border-box";
            cell.setAttribute("id", `${i}`);
            cell.style.border = "1px solid black";
            this.container.appendChild(cell);
        }
        this.container.style.width = `${cell.offsetWidth * Math.sqrt(game.gridSize)}px`;
    },

    defineCellSize(cell) {
        if (game.gridSize === game.sizes.SMALL) {
            cell.classList.add("small-grid-cell");
        }
        else if (game.gridSize === game.sizes.NORMAL) {
            cell.classList.add("normal-grid-cell");
        }
        else {
            cell.classList.add("large-grid-cell");
        }
    },


    displayGameGrid: function() {
        for (let i = 0; i < game.gridSize; i++) {
            const cell = document.getElementById(`${i}`);
            cell.textContent = '';
            cell.style.backgroundColor = "gainsboro";
            if (game.grid[i].value !== 0) {
                cell.textContent = game.grid[i].value;
                this.colorGrid(cell);
            }
        }

        this.congratulateOnHighValue();

        if (game.isGameOver())  {
            this.displayPopup();
        }
    },

    colorGrid: function(grid) {
        const colors = ["lightblue", "lightcoral", "palegreen", "gold", "cornflowerblue", "bisque", "burlywood",
            "crimson", "limegreen", "rebeccapurple", "lightcyan", "orange", "yellow", "lavenderblush"];
        for(let i = 1; i <= colors.length; i++) {
            if (grid.textContent === `${Math.pow(2, i)}`) {
                grid.style.backgroundColor = colors[i-1];
            }
        }
    },

    congratulateOnHighValue: function() {
        let maxNumber = Math.max(...game.grid.map(cell => cell.value));
        if (maxNumber >= this.winNumber) {
            this.sendCongratulationsMessage(maxNumber);
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
                    game.move("left");
                    break;
                case "ArrowRight":
                    game.move("right");
                    break;
                case "ArrowUp":
                    game.move("up");
                    break;
                case "ArrowDown":
                    game.move("down");
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

        this.container.addEventListener('touchstart', function(event){
            let touchObj = event.changedTouches[0];
            startX = touchObj.clientX;
            startY = touchObj.clientY;
        }, false);

        this.container.addEventListener('touchend', function(event){
            let touchObj = event.changedTouches[0];
            endX = touchObj.clientX;
            endY = touchObj.clientY;

            let distanceLeft = startX - endX;
            let distanceRight = endX - startX;
            let distanceUp = startY - endY;
            let distanceDown = endY - startY;

            if (distanceLeft > distanceRight && distanceLeft > distanceDown && distanceLeft > distanceUp) {
                game.move("left");
            } else if (distanceRight > distanceLeft && distanceRight > distanceDown && distanceRight > distanceUp) {
                game.move("right");
            } else if (distanceUp > distanceDown && distanceUp > distanceLeft && distanceUp > distanceRight) {
                game.move("up");
            } else if (distanceDown > distanceUp && distanceDown > distanceLeft && distanceDown > distanceRight) {
                game.move("down");
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
            let size = game.grid.length;
            view.restart(size);
        });
    },

    chooseSize: function() {
        const sizeSelector = document.querySelector("#gridSize");
        sizeSelector.addEventListener("change", function(event) {
            let size = Math.pow(parseInt(sizeSelector.value), 2);
            if (size !== game.sizes.SMALL && size !== game.sizes.NORMAL && size !== game.sizes.LARGE) {
                size = game.sizes.NORMAL;
            }
            sizeSelector.blur();
            view.restart(size);
        });
    },

    resetSizeSelector() {
        const sizeSelector = document.querySelector("#gridSize");
        window.addEventListener("load", function(event) {
           sizeSelector.value = 4;
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
