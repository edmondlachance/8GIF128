#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <vector>
#include "tree.h"
using namespace std;

int main(void){
    int service;
	scanf("%d", &service);
	if(service == 1){
        int s,d,p,pm;
        scanf("%d", &s);
        scanf("%d", &d);
        scanf("%d", &p);
        scanf("%d", &pm);
        Graph g(s,d,p,pm);
        g.PrintGraphLink();
	}
	else if(service==2){
	    int s;
	    scanf("%d\n",&s);
        Graph g(s,true);
        int a,b;
        scanf("%d",&a);
        scanf("%d",&b);
        g.sssp(a,b);
	}
	else if(service==3){
	    int s;
	    scanf("%d\n",&s);
	    Graph g(s,true);
        g.solveMinSpanTree();
	}
}
