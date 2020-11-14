import CodeRunner from './codeRunner';

const testData = `
#include<iostream>
using namespace std;

int main(){
    int i,j;
    cin>>i;
    cin>>j;
    cout<<i<<j;
    cout<<"Hello world";
    while(true){}
    return 0;
}
`;

const submit = async () => {
    const codeRunnerInstance = new CodeRunner('test', 'cpp');
    return await codeRunnerInstance.runCppProgram(testData, '1 2');
};

export default {
    submit
};
