#include <stdlib.h>

typedef struct Test{
    char something[1024];
} Test;


int main() {
    int size = 100000; // 1000 100000
    int i;
    Test *array[size];

    for(i=0; i<size; i++) {
        array[i] = (Test*)malloc(sizeof(Test));
    }
    
    return 0;
}