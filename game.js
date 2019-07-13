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

    getRandomGrid() {
        return Math.floor(Math.random() * this.gridNumber);

    },

    addTwo: function() {
        let gridNumber = this.getRandomGrid();
        while (this.gameGrid[gridNumber].value !== 0) {
            gridNumber = this.getRandomGrid();
        }
        this.gameGrid[gridNumber].value = 2;
    },

    play: function () {
        this.createGameGrid();
        this.addTwo();
    }

};
