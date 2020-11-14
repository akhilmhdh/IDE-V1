import { fstat } from 'fs';
import fs from 'fs/promises';
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
    lang: string;
    /**
     * @param fileName :string
     * @param lang : program lang to compile
     */
    constructor(fileName: string, lang: string) {
        this.fileName = codeSessionDirFile(fileName);
        this.lang = lang;
    }
    /**
     * to save a file to session
     * @param {string} fileName
     * @param  {string } data : content to be saved
     */
    async createAFile(fileName: string, data: any): Promise<void> {
        try {
            fs.writeFile(fileName, data);
            logger.info(`${fileName} saved`);
        } catch (error) {
            logger.error(error, 'File creation failed');
            throw new ErrorHandler(500, 'Internal server error');
        }
    }

    /**
     * to delete a file
     * @param {string} fileName
     */
    async deleteAFile(fileName: string): Promise<void> {
        try {
            fs.unlink(fileName);
            logger.info(`${fileName} deleted`);
        } catch (error) {
            logger.error(error, 'File deletion failed');
            throw new ErrorHandler(500, 'Internal server error');
        }
    }

    async runCppProgram(data: string, input: string) {
        try {
            /**
             * create both c++ input code and input for the code
             */
            await this.createAFile(`${this.fileName}.cpp`, data);
            await this.createAFile(`${this.fileName}-input.txt`, input);

            await asyncExec(`g++ -o ${this.fileName} ${this.fileName}.cpp`);
            const result = await asyncTimedExec(
                `${this.fileName} < ${this.fileName}-input.txt`
            );
            console.log(result);
        } catch (error) {
            throw new ErrorHandler(500, error.message);
        }
    }
}
