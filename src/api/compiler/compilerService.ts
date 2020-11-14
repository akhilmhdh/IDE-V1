import CodeRunner from './codeRunner';

const testData = `
#include<iostream>
using namespace std;

int main(){
    cout<<"Hello world";
    return 0;
}
`;

const submit = async () => {
    const codeRunnerInstance = new CodeRunner('test', 'cpp');
    await codeRunnerInstance.runCppProgram(testData, '');
    return 'hello';
};

export default {
    submit
};
