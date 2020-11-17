import fs from 'fs/promises';
import { existsSync } from 'fs';
import logger from '../../utils/logger';
import path from 'path';
import { ErrorHandler } from '../../utils/errorHandler';
import asyncExec from '../../utils/asyncExec';
import asyncTimedExec from '../../utils/asyncTimedExec';

/**
 * Session directory to save code files temporary
 */
const codeSessionDir = path.join(__dirname, '../../codeSession');
const codeSessionDirFile = (fileName: string) =>
    path.join(codeSessionDir, fileName);

/**
 * class to handle program execution
 * handle temporary file creation and deletion
 */
export default class CodeRunner {
    fileName: string;
    lang: 'c' | 'c++' | 'python3';
    /**
     * @param fileName :string
     * @param lang : program lang to compile
     */
    constructor(fileName: string, lang: 'c' | 'c++' | 'python3') {
        this.fileName = codeSessionDirFile(fileName);
        this.lang = lang;
    }

    /**
     * to save a file to session
     * @param {string} fileName
     * @param  {string } data : content to be saved
     */
    async createAFile(fileName: string, data: any = ' '): Promise<void> {
        try {
            await fs.writeFile(fileName, data);
            logger.info(`${fileName} saved`);
        } catch (error) {
            logger.error(error, 'File creation failed');
            throw new ErrorHandler(500, 'Internal server error');
        }
    }

    async deleteAFile(fileName: string): Promise<void> {
        try {
            await fs.unlink(fileName);
            logger.info(`${fileName} deleted`);
        } catch (error) {
            logger.error(error, 'File deletion failed');
            throw new ErrorHandler(500, 'Internal server error');
        }
    }

    /**
     * central function to run programs based on language
     * @param data : input script or code
     * @param input : program input
     */
    async runCodeRunner(data: string, input: string) {
        try {
            switch (this.lang) {
                case 'c':
                    return await this.runCProgram(data, input);
                case 'c++':
                    return await this.runCppProgram(data, input);

                case 'python3':
                    return await this.runPython3Program(data, input);
                default:
                    return '';
            }
        } catch (error) {
            throw new ErrorHandler(500, error.message);
        }
    }

    /**
     * C program executer
     * @param data : script in C
     * @param input : necessary inputs for the program
     */
    async runCProgram(data: string, input: string) {
        try {
            // create c and input file for the program
            await this.createAFile(`${this.fileName}.c`, data);
            await this.createAFile(`${this.fileName}_input.txt`, input);

            // command line execution -> gcc compile -> run the executable file
            await asyncExec(`gcc -o ${this.fileName} ${this.fileName}.c`);
            const result = await asyncTimedExec(
                `${this.fileName} < ${this.fileName}_input.txt`,
                this.fileName
            );

            // clean-up
            await this.deleteAFile(`${this.fileName}.c`);
            await this.deleteAFile(`${this.fileName}`);
            await this.deleteAFile(`${this.fileName}_input.txt`);

            return result;
        } catch (error) {
            // clean-up
            await this.deleteAFile(`${this.fileName}.c`);
            if (existsSync(`${this.fileName}`))
                await this.deleteAFile(`${this.fileName}`);
            await this.deleteAFile(`${this.fileName}_input.txt`);
            throw new Error(error.message);
        }
    }

    /**
     * cpp program executer
     * @param data : script in C++
     * @param input : necessary inputs for the program
     */
    async runCppProgram(data: string, input: string) {
        try {
            // create cpp and input file for the program
            await this.createAFile(`${this.fileName}.cpp`, data);
            await this.createAFile(`${this.fileName}_input.txt`, input);

            // command line execution
            await asyncExec(`g++ -o ${this.fileName} ${this.fileName}.cpp`);
            const result = await asyncTimedExec(
                `${this.fileName} < ${this.fileName}_input.txt`,
                this.fileName
            );
            // clean-up
            await this.deleteAFile(`${this.fileName}.cpp`);
            await this.deleteAFile(`${this.fileName}`);
            await this.deleteAFile(`${this.fileName}_input.txt`);
            return result;
        } catch (error) {
            // clean-up
            await this.deleteAFile(`${this.fileName}.cpp`);
            if (existsSync(`${this.fileName}`))
                await this.deleteAFile(`${this.fileName}`);
            await this.deleteAFile(`${this.fileName}_input.txt`);
            throw new Error(error.message);
        }
    }

    /**
     * python program executer
     * @param data : script in python
     * @param input : necessary inputs for the program
     */
    async runPython3Program(data: string, input: string) {
        try {
            // create both python input code and input for the code to run
            await this.createAFile(`${this.fileName}.py`, data);
            await this.createAFile(`${this.fileName}_input.txt`, input);

            /**
             * command line execution
             * As python is an interpretor, it needs only one step
             */
            const result = await asyncTimedExec(
                `python3 ${this.fileName}.py < ${this.fileName}_input.txt `,
                this.fileName
            );

            // clean-up
            await this.deleteAFile(`${this.fileName}.py`);
            await this.deleteAFile(`${this.fileName}_input.txt`);

            return result;
        } catch (error) {
            // clean-up
            await this.deleteAFile(`${this.fileName}.py`);
            await this.deleteAFile(`${this.fileName}_input.txt`);
            throw new Error(error.message);
        }
    }
}
