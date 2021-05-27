import { expect, test } from "@jest/globals";
import { Server } from "./server";

test('can test server', async () => {
    const server = Server();
    await new Promise((resolve, reject) => {
        server.on('error', (e) => reject(e));
        server.on('listening', () => resolve(undefined));
        server.listen(0);
    })
    await new Promise((resolve, reject) => {
        server.close(resolve);
    })
})
