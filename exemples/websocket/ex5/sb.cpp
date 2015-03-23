#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <vector>
using namespace std;

//Les adjlist de tous les vertex forment une matrice d'adjacence, même si physiquement sur la mémoire ce n'est pas une matrice
struct vertex
{
	vector<int> adjlist; //1 quand visité
	int visited; //1 visité, reste non visité
	int i; //on store l'indice (pratique)
};

struct dfs_algo
{
	vector<vertex> vertices;  //contient le graphe en entier

//Simple dfs qui explore le graphe en imprimant son parcours
void dfs(int v) 
{

	vertex* current = &vertices[v];
	if (current->visited == 1) return;
	
	//Marquer ce vertex comme visité
	current->visited = 1;

	//Explorer les voisins, profondeur d'abord
	for (int i = 0; i < current->adjlist.size(); i++) 
	{
		//Si i est un voisin, on explore
		if (current->adjlist[i] == 1 && vertices[i].visited != 1) {
			printf("%d -> %d\n", v, i);
			dfs(i);
		}
	}
}

void addEdge(char * line)
{
	//Construire le graphe ligne par ligne
	int s1,s2;
	sscanf(line, "%d %d", &s1, &s2);

	//Graphe non dirigé : on met l'arete dans les deux sens
	vertices[s1].adjlist[s2] = 1;
	vertices[s2].adjlist[s1] = 1;
}

};

int main(void)
{
	static char buffer[1000];
	static char line[100];
	setbuf(stdout, NULL);

	//Lire la taille du problème (1ere ligne). n = plus gros sommet possible
	int n = 0;
	scanf("%d\n", &n);

	//Read lines until end of file indicator
	dfs_algo d;
	d.vertices.resize(n+1);
	for (int i = 0; i <= n; i++) {
	  d.vertices[i].adjlist.resize(n+1,0);
	  d.vertices[i].visited = false;
	  d.vertices[i].i = i;
  }
	//Ferme la lecture de stdin une fois que # est trouvé
	while (1) {

	gets(line);
	if (line[0] == '#') 
		break;
	d.addEdge(line);
	}

	//L'algo dfs s'occupe de faire les print
	d.dfs(0);
	printf("\n");
	
}
