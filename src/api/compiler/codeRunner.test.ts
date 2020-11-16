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

describe('Code Runner Class', async () => {
    const codeRunnerCInstance = new CodeRunner('testC', 'c');
    const codeRunnerCPPInstance = new CodeRunner('testCpp', 'c++');
    const codeRunnerPythonInstance = new CodeRunner('testPy', 'python3');

    it('Should run the C program without errors', async () => {
        const result = await codeRunnerCInstance.runCodeRunner(
            codeTemplate.c.standard,
            ' '
        );
        expect(result).to.equal('hello world');
        expect(result).to.be.a('string');
    });

    it('C program with errors', async () => {
        try {
            await codeRunnerCInstance.runCodeRunner(codeTemplate.c.error, ' ');
        } catch (error) {
            expect(error.message).to.be.a('string');
        }
    });

    it('Should run the C++ program without errors', async () => {
        const result = await codeRunnerCPPInstance.runCodeRunner(
            codeTemplate.cpp.standard,
            ' '
        );
        expect(result).to.equal('hello world');
        expect(result).to.be.a('string');
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

    it('Should run the Python program without errors', async () => {
        const result = await codeRunnerPythonInstance.runCodeRunner(
            codeTemplate.py.standard,
            ' '
        );
        expect(result).to.equal('hello world\n');
        expect(result).to.be.a('string');
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
});
