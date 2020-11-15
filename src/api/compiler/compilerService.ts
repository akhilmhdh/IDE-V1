import CodeRunner from './codeRunner';

const testData = `
print("hello world")
`;

const submit = async () => {
    const codeRunnerInstance = new CodeRunner('test', 'python');
    return await codeRunnerInstance.runPython3Program(testData, '');
};

export default {
    submit
};
