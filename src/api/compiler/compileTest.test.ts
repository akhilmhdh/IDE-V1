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

describe('C code runner', async () => {
    const codeRunnerInstance = new CodeRunner('test', 'c');

    it('should run the c program', async () => {
        const result = await codeRunnerInstance.runCProgram(
            codeTemplate.c.standard,
            ''
        );
        expect(result).to.equal('hello world');
        expect(result).to.be.a('string');
    });
});
