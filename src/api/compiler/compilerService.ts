import CodeRunner from './codeRunner';

const testData = `
#include<stdio.h>

int main(){
    printf("%s","hello world");
    return 0;
}
`;

const submit = async () => {
    const codeRunnerInstance = new CodeRunner('test', 'c');
    return await codeRunnerInstance.runCProgram(testData, '');
};

export default {
    submit
};
