// this file handles all aspects of networking
import { createServer } from 'http';

import logger from '../utils/logger';
import app from '../index';

const normalizePort = (val: string) => {
    const port = parseInt(val, 10);
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '8000');
app.set('port', port);

const server = createServer(app);

server.listen(port, () => {
    logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
