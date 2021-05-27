class Tile {
    toJSON() {
        return ' '
    }
}

/**
 * Object representing a multiplayer world of things on a grid
 */
export class GridWorld {
    grid: Array<Array<Tile>>;
    constructor(size: Number) {
        this.grid = SquareTileGrid(size);
    }
    public toJSON() {
        return this.grid;
    }
    public toString() {
        // pretty print
        let s = '[\n'
        for (let i=0; i<this.grid.length; i++) {
            s += JSON.stringify(this.grid[i])
            if (i !== this.grid.length-1) s+= ','
            s += '\n'
        }
        s += ']'
        return s;
    }
}

function SquareTileGrid(size: Number): Tile[][] {
    const grid: Tile[][] = [];
    for (let i=0; i<size; i++) {
        grid[i] = [];
        for (let j=0; j<size; j++) {
            grid[i][j] = new Tile
        }
    }
    return grid;
}
