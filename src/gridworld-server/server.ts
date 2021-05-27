import * as http from "http";
import { GridWorld } from '../gridworld/gridworld';

/**
 * HTTP Server for MMO GridWorld
 */
export function Server(): http.Server {
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
