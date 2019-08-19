export const game = {
    gridSize: null,
    gameGrid: [],
    cellsLeftToRight: [],
    cellsRightToLeft: [],
    cellsUpToDown: [],
    cellsDownToUp: [],
    previousState: null,

    createGameGrid: function(size) {
        this.gridSize = size;
        for (let i = 0; i < this.gridSize; i++) {
            this.gameGrid.push({
                index: i,
                value: 0
            });
        }
    },

    fillGridsLeftToRight: function () {
        for(let i = 0; i < this.gameGrid.length; i += Math.sqrt(this.gameGrid.length)) {
            let line = [];
            for (let j = 0; j < Math.sqrt(this.gameGrid.length); j++) {
                line.push((this.gameGrid[i + j]));
            }
            this.cellsLeftToRight.push(line);
        }
    },

    fillGridsRightToLeft: function() {
        for(let i = 0; i < this.gameGrid.length; i += Math.sqrt(this.gameGrid.length)) {
            let line = [];
            for (let j = Math.sqrt(this.gameGrid.length) - 1; j >= 0; j--) {
                line.push((this.gameGrid[i + j]));
            }
            this.cellsRightToLeft.push(line);
        }
    },

    fillGridsUpToDown: function() {
        for(let i = 0; i < Math.sqrt(this.gameGrid.length); i++) {
            let column = [];
            for (let j = 0; j < this.gameGrid.length; j += Math.sqrt(this.gameGrid.length)) {
                column.push((this.gameGrid[i + j]));
            }
            this.cellsUpToDown.push(column);
        }
    },

    fillGridsDownToUp: function() {
        for(let i = 0; i < Math.sqrt(this.gameGrid.length); i++) {
            let column = [];
            for (let j = this.gameGrid.length - Math.sqrt(this.gameGrid.length);
                     j >= 0; j -= Math.sqrt(this.gameGrid.length)) {
                column.push((this.gameGrid[i + j]));
            }
            this.cellsDownToUp.push(column);
        }
    },

    addNext: function() {
        if (this.gameGrid.filter(grid => grid.value === 0).length === 0) return;

        let cellIndex = Math.floor(Math.random() * this.gridSize);
        while (this.gameGrid[cellIndex].value !== 0) {
            cellIndex = Math.floor(Math.random() * this.gridSize);
        }
        this.gameGrid[cellIndex].value = this.getRandomNumber();
    },

    getRandomNumber: function() {
       const percent = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

       if (this.gridSize < 16) {
           return 2;
       } else if (this.gridSize === 16) {
           let randomNumber = Math.floor(Math.random() * percent.length);
           return randomNumber < 9 ? 2 : 4;
       } else {
           let randomNumber = Math.floor(Math.random() * percent.length);
           return randomNumber < 7 ? 2 : randomNumber < 9 ? 4 : 8;
       }
    },

    move: function(direction) {
        const prevState = JSON.stringify(this.gameGrid);

        let grids;
        switch(direction) {
            case "left":
                grids = this.cellsRightToLeft;
                break;
            case "right":
                grids = this.cellsLeftToRight;
                break;
            case "up":
                grids = this.cellsDownToUp;
                break;
            case "down":
                grids = this.cellsUpToDown;
                break;
        }

        for (let line of grids){
            this.arrangeLine(line);
        }
        if (this.isAnythingMoved(prevState)) {
            this.addNext();
            this.previousState = JSON.parse(prevState);
        }
    },


    addSameNeighbours: function(grids) {
        for (let i = Math.sqrt(this.gridSize) - 2; i >= 0; i--) {
            if (grids[i].value === grids[i + 1].value) {
                grids[i + 1].value *= 2;
                grids[i].value = 0;
            }
        }
    },

    shiftOverEmptyGrids: function(grids) {
        for (let i = 0; i < Math.sqrt(this.gridSize) - 1; i++) {
            for (let j = 0; j < Math.sqrt(this.gridSize) - 1; j++) {
                if (grids[j + 1].value === 0) {
                    grids[j + 1].value = grids[j].value;
                    grids[j].value = 0;
                }
            }
        }
    },

    arrangeLine: function(line) {
        this.shiftOverEmptyGrids(line);
        this.addSameNeighbours(line);
        this.shiftOverEmptyGrids(line);
    },

    isAnythingMoved: function(prevState) {
        return prevState !== JSON.stringify(this.gameGrid);
    },

    isGameOver: function() {
        if (this.gameGrid.find(grid => grid.value === 0)) {
            return false;
        }

        for (let i = 0; i < Math.sqrt(this.gridSize); i++) {
            for (let j = 0; j < Math.sqrt(this.gridSize) - 1; j++) {
                if (this.cellsRightToLeft[i][j].value === this.cellsRightToLeft[i][j + 1].value ||
                        this.cellsLeftToRight[i][j].value === this.cellsLeftToRight[i][j + 1].value ||
                        this.cellsUpToDown[i][j].value === this.cellsUpToDown[i][j + 1].value ||
                        this.cellsDownToUp[i][j].value === this.cellsDownToUp[i][j + 1].value) {
                    return false;
                }
            }

        }
        return true;
    },

    undo: function() {
        for (let i = 0; i < this.gameGrid.length; i++) {
            this.gameGrid[i].value = parseInt(this.previousState[i].value);
        }
    },

    initGame: function(size) {
        this.createGameGrid(size);
        this.fillGridsLeftToRight();
        this.fillGridsRightToLeft();
        this.fillGridsUpToDown();
        this.fillGridsDownToUp();
        this.addNext();
    },

    destroyGame: function() {
        this.gameGrid = [];
        this.cellsLeftToRight = [];
        this.cellsRightToLeft = [];
        this.cellsUpToDown = [];
        this.cellsDownToUp = [];
    }

};
