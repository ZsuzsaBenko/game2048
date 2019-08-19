import {game} from './game.js';


export const view = {
    container: document.querySelector("#game-container"),
    windowSize: window.innerWidth,
    windowSizeBreakpoints: [200, 600, 1000],
    sizesForFewerGrids:  [85, 105, 110],
    sizesForNormalGrids: [65, 85, 90],
    sizesForMoreGrids: [55, 70, 75],
    winNumber: 128,

    createGameGrid: function() {
        this.defineContainerSize();

        for (let i = 0; i < game.gridSize; i++) {
            let grid = document.createElement("div");
            this.defineGridSize(grid);
            grid.style.boxSizing = "border-box";
            grid.setAttribute("id", `${i}`);
            grid.style.border = "1px solid black";
            this.container.appendChild(grid);
        }
    },

    defineContainerSize() {
        const fontSizes = [13, 20, 25];
        for (let i = 0; i < this.windowSizeBreakpoints.length; i++) {
            if (this.windowSize > this.windowSizeBreakpoints[i] && game.gridSize < 16) {
                this.container.style.width = `${this.sizesForFewerGrids[i] * Math.sqrt(game.gridSize)}px`;
                this.container.style.height = `${this.sizesForFewerGrids[i] * Math.sqrt(game.gridSize)}px`;
                this.container.style.lineHeight = `${this.sizesForFewerGrids[i] - 2}px`;
            } else if (this.windowSize > this.windowSizeBreakpoints[i] && game.gridSize === 16) {
                this.container.style.width = `${this.sizesForNormalGrids[i] * Math.sqrt(game.gridSize)}px`;
                this.container.style.height = `${this.sizesForNormalGrids[i] * Math.sqrt(game.gridSize)}px`;
                this.container.style.lineHeight = `${this.sizesForNormalGrids[i] - 2}px`;
            } else if (this.windowSize > this.windowSizeBreakpoints[i] && game.gridSize > 16) {
                this.container.style.width = `${this.sizesForMoreGrids[i] * Math.sqrt(game.gridSize)}px`;
                this.container.style.height = `${this.sizesForMoreGrids[i] * Math.sqrt(game.gridSize)}px`;
                this.container.style.lineHeight = `${this.sizesForMoreGrids[i] - 2}px`;
            }
            this.container.style.fontSize = `${fontSizes[i]}px`;
        }
    },

    defineGridSize(grid) {
        for (let i = 0; i < this.windowSizeBreakpoints.length; i++) {
            if (this.windowSize > this.windowSizeBreakpoints[i] && game.gridSize < 16) {
                grid.style.width = `${this.sizesForFewerGrids[i]}px`;
                grid.style.height = `${this.sizesForFewerGrids[i]}px`;
            } else if (this.windowSize > this.windowSizeBreakpoints[i] && game.gridSize === 16) {
                grid.style.width = `${this.sizesForNormalGrids[i]}px`;
                grid.style.height = `${this.sizesForNormalGrids[i]}px`;
            } else if (this.windowSize > this.windowSizeBreakpoints[i] && game.gridSize > 16) {
                grid.style.width = `${this.sizesForMoreGrids[i]}px`;
                grid.style.height = `${this.sizesForMoreGrids[i]}px`;
            }
        }
    },

    displayGameGrid: function() {
        for (let i = 0; i < game.gridSize; i++) {
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
