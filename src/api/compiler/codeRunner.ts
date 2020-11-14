import { fstat } from 'fs';
import fs from 'fs/promises';
import logger from '../../utils/logger';
import path from 'path';
import { exec } from 'child_process';

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
class CodeRunner {
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
        }
    }

    async runCppProgram(fileName: string, data: string, input: string) {
        return new Promise((resolve, reject) => {});
    }
}
