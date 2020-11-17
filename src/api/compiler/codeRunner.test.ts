/**
 * importing testing libraries
 */
import { expect } from 'chai';
import { it, describe } from 'mocha';

/**
 * testing parts
 */
import CodeRunner from './codeRunner';
import codeTemplate from '../../codeTemplates';

describe('Code Runner Class', async function () {
    const codeRunnerCInstance = new CodeRunner('testC', 'c');
    const codeRunnerCPPInstance = new CodeRunner('testCpp', 'c++');
    const codeRunnerPythonInstance = new CodeRunner('testPy', 'python3');

    it('Should run the C program without errors', async function () {
        const result = await codeRunnerCInstance.runCodeRunner(
            codeTemplate.c.standard,
            ' '
        );
        expect(result).to.be.a('string');
        expect(result).to.equal('hello world');
    });

    it('C program with errors', async function () {
        try {
            await codeRunnerCInstance.runCodeRunner(codeTemplate.c.error, ' ');
        } catch (error) {
            expect(error.message).to.be.a('string');
        }
    });

    it('Should run the C++ program without errors', async function () {
        const result = await codeRunnerCPPInstance.runCodeRunner(
            codeTemplate.cpp.standard,
            ' '
        );
        expect(result).to.be.a('string');
        expect(result).to.equal('hello world');
    });

    it('Cpp program with errors', async () => {
        try {
            await codeRunnerCPPInstance.runCodeRunner(
                codeTemplate.cpp.error,
                ' '
            );
        } catch (error) {
            expect(error.message).to.be.a('string');
        }
    });

    it('Should run the Python program without errors', async function () {
        const result = await codeRunnerPythonInstance.runCodeRunner(
            codeTemplate.py.standard,
            ' '
        );
        expect(result).to.be.a('string');
        expect(result).to.equal('hello world\n');
    });

    it('Python program with errors', async () => {
        try {
            await codeRunnerPythonInstance.runCodeRunner(
                codeTemplate.py.error,
                ' '
            );
        } catch (error) {
            expect(error.message).to.be.a('string');
        }
    });

    it('Timout on infinite loop or program takes too long', async function () {
        this.timeout(6000);
        try {
            await codeRunnerCPPInstance.runCodeRunner(
                codeTemplate.cpp.infLoop,
                ' '
            );
        } catch (error) {
            expect(error.message).to.be.a('string');
            expect(error.message).to.equal('Timeout');
        }
    });
});
