export default {
    standard: `
    #include<stdio.h>
    
    int main(){
        printf("%s","hello world");
        return 0;
    }`,
    error: `
    #include<stdio.h>
    
    int main(){
        printf("%s","hello world")
        return 0;
    }`
};
