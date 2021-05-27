import * as http from "http";
import { promisify } from "util";

class Tile {
    toJSON() {
        return ' '
    }
}

/**
 * Object representing a multiplayer world of things on a grid
 */
class GridWorld {
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

/**
 * HTTP Server for MMO GridWorld
 */
function Server(): http.Server {
    const world = new GridWorld(16);
    const server = new http.Server((req, res) => {
        res.writeHead(200, 'ok', {
            'content-type': 'application/json',
        })
        res.write(world.toString());
        res.write('\n')
        res.end();
    });
    return server;
}

async function runDemoServer(options?: {
    cancel?: Promise<any>
}) {
    const server = Server();
    return new Promise((resolve, reject) => {
        options?.cancel?.then((cancel) => {
            console.warn('server cancelled');
            resolve(cancel);
        });
        server.listen(process.env.PORT || 0);
        server.on('listening', () => {
            console.log('server listening at ', server.address())
        })
        server.on('error', (error) => reject(error));
        server.on('close', () => resolve(undefined));
    })
}

if (require.main === module) {
    runDemoServer()
    .catch(error => {
        console.error('uncaught error from runDemoServer()', error);
    });
}
