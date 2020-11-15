import { exec } from 'child_process';
import { ErrorHandler } from './errorHandler';

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}: command line function
 * @return {Promise<string>}
 */
const asyncExec = (cmd: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(error.message));
            }
            resolve(stdout);
        });
    });
};

export default asyncExec;
