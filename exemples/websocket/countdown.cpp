#include <stdio.h>
#include <windows.h>

//Cette version ne marche que sur Windows
//Sur linux inclure <uninstd.h> et utiliser usleep ou autre

int main() {
    int i;

    // Disable output buffering.
    setbuf(stdout, NULL);

    for (i = 1; i <= 10; i++) {
        printf("%d\n", i);
        //usleep(500000);
		Sleep(500); //sleep .5 secondes
    }

    return 0;
}