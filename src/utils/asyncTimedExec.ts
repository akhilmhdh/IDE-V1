import asyncExec from './asyncExec';
import logger from './logger';

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}: command line function
 * @return {Promise<string>}
 */
const asyncTimedExec = async (cmd: string): Promise<any> => {
    try {
        const execPromise = asyncExec(cmd);

        const timeOutPromise = new Promise((resolve, reject) => {
            setTimeout(reject, 5000, 'Timeout');
        });

        const result = await Promise.race([timeOutPromise, execPromise]);
        return result;
    } catch (error) {
        logger.error(error, error.message);
        throw new Error(error.message);
    }
};

export default asyncTimedExec;
