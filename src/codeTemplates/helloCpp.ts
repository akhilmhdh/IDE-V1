export default {
    standard: `
    #include<iostream>
    using namespace std;
    
    int main(){
        cout<<"hello world";
        return 0;
    }`,
    error: `
    #include<iostream>
    using namespace std;
    
    int main(){
        cout<<"Hello world"
        return 0;
    }`,
    infLoop: `
    #include<iostream>
    using namespace std;
    
    int main(){
        while(true){}
        return 0;
    }
    `
};
