import asyncExec from './asyncExec';
import logger from './logger';

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}: command line function
 * @return {Promise<string>}
 */
const asyncTimedExec = async (
    cmd: string,
    appicationName: string
): Promise<any> => {
    try {
        const execPromise = asyncExec(cmd);

        const timeOutPromise = new Promise((resolve, reject) => {
            let timeoutId = setTimeout(async () => {
                clearTimeout(timeoutId);
                reject(new Error('Timeout'));
            }, 3000);
        });

        const result = await Promise.race([execPromise, timeOutPromise]);
        return result;
    } catch (error) {
        // kill the process
        logger.error(error, error.message);
        await asyncExec(`pkill ${appicationName}`);
        throw new Error(error.message);
    }
};

export default asyncTimedExec;
