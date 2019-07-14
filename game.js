export const game = {
    gridNumber: 16,
    gameGrid: [],

    createGameGrid: function() {
        for (let i = 0; i < this.gridNumber; i++) {
            this.gameGrid.push({
                index: i,
                value: 0
            });
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
        const RightToLeft = [[this.gameGrid[3], this.gameGrid[2], this.gameGrid[1], this.gameGrid[0]],
                             [this.gameGrid[7], this.gameGrid[6], this.gameGrid[5], this.gameGrid[4]],
                             [this.gameGrid[11], this.gameGrid[10], this.gameGrid[9], this.gameGrid[8]],
                             [this.gameGrid[15], this.gameGrid[14], this.gameGrid[13], this.gameGrid[12]]];

        for (let line of RightToLeft){
            this.addSameNeighbours(line);
            this.shiftOverEmptyGrids(line);
        }
        this.addTwo();
    },

     moveRight: function() {
        const LeftToRight = [[this.gameGrid[0], this.gameGrid[1], this.gameGrid[2], this.gameGrid[3]],
                             [this.gameGrid[4], this.gameGrid[5], this.gameGrid[6], this.gameGrid[7]],
                             [this.gameGrid[8], this.gameGrid[9], this.gameGrid[10], this.gameGrid[11]],
                             [this.gameGrid[12], this.gameGrid[13], this.gameGrid[14], this.gameGrid[15]]];

        for (let line of LeftToRight){
            this.addSameNeighbours(line);
            this.shiftOverEmptyGrids(line);
        }
        this.addTwo();
    },

    moveUp: function() {
        const DownToUp = [[this.gameGrid[12], this.gameGrid[8], this.gameGrid[4], this.gameGrid[0]],
                          [this.gameGrid[13], this.gameGrid[9], this.gameGrid[5], this.gameGrid[1]],
                          [this.gameGrid[14], this.gameGrid[10], this.gameGrid[6], this.gameGrid[2]],
                          [this.gameGrid[15], this.gameGrid[11], this.gameGrid[7], this.gameGrid[3]]];

        for (let line of DownToUp){
            this.addSameNeighbours(line);
            this.shiftOverEmptyGrids(line);
        }
        this.addTwo();
    },

    moveDown: function() {
        const UpToDown = [[this.gameGrid[0], this.gameGrid[4], this.gameGrid[8], this.gameGrid[12]],
                          [this.gameGrid[1], this.gameGrid[5], this.gameGrid[9], this.gameGrid[13]],
                          [this.gameGrid[2], this.gameGrid[6], this.gameGrid[10], this.gameGrid[14]],
                          [this.gameGrid[3], this.gameGrid[7], this.gameGrid[11], this.gameGrid[15]]];

        for (let line of UpToDown){
            this.addSameNeighbours(line);
            this.shiftOverEmptyGrids(line);
        }
        this.addTwo();
    },

    addSameNeighbours: function(grids) {
        for (let i = 2; i >= 0; i--) {
            if (grids[i].value === grids[i + 1].value) {
                grids[i + 1].value *= 2;
                grids[i].value = 0;
            }

        }
    },

    shiftOverEmptyGrids: function(grids) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grids[j + 1].value === 0) {
                    grids[j + 1].value = grids[j].value;
                    grids[j].value = 0;
                }

            }
        }
    },

    startGame: function () {
        this.createGameGrid();
        this.addTwo();
    }

};
