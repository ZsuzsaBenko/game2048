export const game = {
    gridNumber: null,
    gameGrid: [],
    gridsLeftToRight: [],
    gridsRightToLeft: [],
    gridsUpToDown: [],
    gridsDownToUp: [],

    createGameGrid: function(size) {
        this.gridNumber = size;
        for (let i = 0; i < this.gridNumber; i++) {
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
            this.gridsLeftToRight.push(line);
        }
    },

    fillGridsRightToLeft: function() {
        for(let i = 0; i < this.gameGrid.length; i += Math.sqrt(this.gameGrid.length)) {
            let line = [];
            for (let j = Math.sqrt(this.gameGrid.length) - 1; j >= 0; j--) {
                line.push((this.gameGrid[i + j]));
            }
            this.gridsRightToLeft.push(line);
        }
    },

    fillGridsUpToDown: function() {
        for(let i = 0; i < Math.sqrt(this.gameGrid.length); i++) {
            let column = [];
            for (let j = 0; j < this.gameGrid.length; j += Math.sqrt(this.gameGrid.length)) {
                column.push((this.gameGrid[i + j]));
            }
            this.gridsUpToDown.push(column);
        }
    },

    fillGridsDownToUp: function() {
        for(let i = 0; i < Math.sqrt(this.gameGrid.length); i++) {
            let column = [];
            for (let j = this.gameGrid.length - Math.sqrt(this.gameGrid.length);
                     j >= 0; j -= Math.sqrt(this.gameGrid.length)) {
                column.push((this.gameGrid[i + j]));
            }
            this.gridsDownToUp.push(column);
        }
    },

    addTwo: function() {
        if (this.gameGrid.filter(grid => grid.value === 0).length === 0) return;

        let gridNumber = Math.floor(Math.random() * this.gridNumber);
        while (this.gameGrid[gridNumber].value !== 0) {
            gridNumber = Math.floor(Math.random() * this.gridNumber);
        }
        this.gameGrid[gridNumber].value = 2;
    },

    moveLeft: function() {
        const prevState = JSON.stringify(this.gameGrid);
        for (let line of this.gridsRightToLeft){
            this.addSameNeighbours(line);
            this.shiftOverEmptyGrids(line);
        }
        if (this.isAnythingMoved(prevState)) {
            this.addTwo();
        }
    },

     moveRight: function() {
         const prevState = JSON.stringify(this.gameGrid);
        for (let line of this.gridsLeftToRight){
            this.addSameNeighbours(line);
            this.shiftOverEmptyGrids(line);
        }
         if (this.isAnythingMoved(prevState)) {
             this.addTwo();
         }
    },

    moveUp: function() {
        const prevState = JSON.stringify(this.gameGrid);
        for (let line of this.gridsDownToUp){
            this.addSameNeighbours(line);
            this.shiftOverEmptyGrids(line);
        }
        if (this.isAnythingMoved(prevState)) {
            this.addTwo();
        }
    },

    moveDown: function() {
        const prevState = JSON.stringify(this.gameGrid);
        for (let line of this.gridsUpToDown){
            this.addSameNeighbours(line);
            this.shiftOverEmptyGrids(line);
        }
        if (this.isAnythingMoved(prevState)) {
            this.addTwo();
        }
    },

    addSameNeighbours: function(grids) {
        for (let i = Math.sqrt(this.gridNumber) - 2; i >= 0; i--) {
            if (grids[i].value === grids[i + 1].value) {
                grids[i + 1].value *= 2;
                grids[i].value = 0;
            }

        }
    },

    shiftOverEmptyGrids: function(grids) {
        for (let i = 0; i < Math.sqrt(this.gridNumber) - 1; i++) {
            for (let j = 0; j < Math.sqrt(this.gridNumber) - 1; j++) {
                if (grids[j + 1].value === 0) {
                    grids[j + 1].value = grids[j].value;
                    grids[j].value = 0;
                }
            }
        }
    },

    isAnythingMoved: function(prevState) {
        return prevState !== JSON.stringify(this.gameGrid);
    },

    initGame: function(size) {
        this.createGameGrid(size);
        this.fillGridsLeftToRight();
        this.fillGridsRightToLeft();
        this.fillGridsUpToDown();
        this.fillGridsDownToUp();
        this.addTwo();
    },

    destroyGame: function() {
        this.gameGrid = [];
        this.gridsLeftToRight = [];
        this.gridsRightToLeft = [];
        this.gridsUpToDown = [];
        this.gridsDownToUp = [];
    }

};
