import { exec } from 'child_process';

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}: command line function
 * @return {Promise<string>}
 */
const asyncExec = (cmd: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject('commandline argument failed');
            }
            resolve(stdout);
        });
    });
};

export default asyncExec;
