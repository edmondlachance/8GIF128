#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <queue>
#include<time.h>
#include<stdlib.h>
#include<limits>
#include<limits.h>
using namespace std;

//Les adjlist de tous les vertex forment une matrice d'adjacence, mÍme si physiquement sur la mÈmoire ce n'est pas une matrice
class Graph
{

  int C; // Nombre de sommet
  int densite; // Densite
  int **tableau2D; // Matrice d'adjacence
  public:
  Graph(int C,int densite); //  Genere le graph
  int rand_a_b(int a,int b); //  genere le nombre aleatoire
  void isConnexe(int C); //  Parcours largeur + rend connexte le graph
  void Display(); //  Affiche une partie de la matrice d'ajacence
  void prims(); // Permet de faire l'arbre couvrant minimum
  int Distanceminimum(int dist[], bool sptSet[]); // Trouve la plus cours distance
  void dijkstra(int node); // Effectue Dijikstra d'un noeud vers tous les autres noeuds du graph
  int GetC(); // Getteur pour avoir le nombre de sommet
};

int Graph::GetC() // Getteur pour le nombre de sommet C
{
  return C;
}

int Graph::rand_a_b(int a,int b) //  genere un nombre entre les bornes
{
  return rand()%(b-a) + a;
}

// Generation de la matrice d'adjacence du Graph
Graph::Graph(int C,int densite)
{
  this->C = C;
  this->densite = densite;
  int nbaleatoire = 0;
  srand(time(NULL)); // initialisation de rand;
  tableau2D = new int*[C];//initialisation du tableau a 2 Dim.

  for(int i = 0 ; i < C ; i ++)
   tableau2D[i] = new int [C];

  for(int i = 0; i < C ; i++) // On init la matrice a 0
   {
    for(int j=0 ; j < C ; j++)
     {
      tableau2D[i][j] = 0; // On init la matrice d'adjacence a 0, 0 etant un sommet non existant
     }
   }

  for(int x = 0; x < C ; x++) // On genere un nb aleatoire, si inferieur a dens alors on remplit la matrice
   {
    for(int y = x + 1 ; y < C ; y++) //  On ne peux pas avoir de cycle donc on commence la boucle sur x+1
     {
      nbaleatoire = rand_a_b(0,100); //  Generation du nb aleatoire.
      int nb = rand_a_b(1,9); // generation de l'entier entre 1 et 9
      if(nbaleatoire < densite)
       {
        tableau2D[x][y] = nb; // x-y
        tableau2D[y][x] = nb; // y-x
       }
     }
   }
}

// parcours largeur du graph + liaison des sommets non relies
void Graph::isConnexe(int C)
{
  this->C = C;
  int j = 0;
  int i = 0;
  int premierElt = -15;
  bool IsConnexe = true; //  bolean isConnexe qui vaut true.
  queue <int> valeur;
  bool *tab = new bool[C]; // tableau de boolean de la taille du nb de sommet.

  for(int w=0 ; w < C ; w++)
   {
    tab[w] = false;
   } //  On init le tableau de boolean a faux.

  // On cherche un sommet
  while(j < C && premierElt != -15)
   {
    i = j+1;
    while(i < C)
     {
      if(tableau2D[i][j] != 0 && premierElt != -15)
       {
        premierElt = i;
       }
      i++;
     }
    j++;
   }

  //Parcours Largeurs, on enfile les sommets et on les marquent //  Algo
  // utilise celui de ma prof.
  valeur.push(premierElt);
  while(!valeur.empty())
   {
    premierElt = valeur.front();
    valeur.pop();
    tab[premierElt] = true;
    for(int i = 0; i < C ; i++)
     {
      if(!tab[i] && tableau2D[premierElt][i] != 0)
       {
        valeur.push(i);
       }
     }
   }
  // Si certain elements sont non marque ils ont ete marque par faux dans le
  // tableau de boolean
  for(int s=0; s<C ;s++)
   {
    if(!tab[s]) // Si c'est faux alors on traite le noeud
     {
      i = 1;
      while(!tab[(s+i)%C]) // On avance tant que c'est faux afin de trouver un lien a vrai pour le relier
       {
        i++;
       }
      int random = rand_a_b(1,9); //  On genere un nombre entre 1 et 9
      tableau2D[s][(s+i)%C] = random; // On l'applique a la matrice,on fait %c pour eviter de sortir du tableau et d'avoir un segment fault memory.
      tableau2D[(s+i)%C][s] = random; // On est dans un graph non oriente donc il faut marque x-y et y-x
     }
   }
}


//minDist trouve le noeud non marque ayant le plus petit poids
int Graph::Distanceminimum(int dist[], bool Traitement[])
{
  int minimum = INT_MAX;
  int index = 0;
  for(int c=0; c<C;c++)
   {
    if(Traitement[c]==false && Traitement[c] <= minimum)
     {
      minimum = dist[c];
      index=c;
     }
   }
  return index;
}

//djikstra donne la distance minimale (en additionnant les poids des arretes
//parcourues) de node vers chaque autre noeud du graphe
void Graph::dijkstra(int node)
{
  // Initialisation des elements.
  bool Traitement[C];//permet de savoir quel noeud est deja traite
  int distance[C]; //les distances minimales seront stockees dans dist
  int maximum = INT_MAX;
  distance[node]= 0;

  for(int w = 0 ; w < C ; w++)
   {
    Traitement[w]=false; 
   }
  for(int c=0; c<C;c++)
   {
    distance[c] = maximum;
   }

  for(int i=0; i< C-1; i++)
   {
    int app = this->Distanceminimum(distance,Traitement); // On recupere le noeud non marque avec le plus petit poid
    Traitement[app]=true;
    for(int c=0; c<C;c++)
     {
      //on verifie que le noeud n'est pas deja dans le chemin, et qu'atteindre c
      //en passant par u a moins de valeur que d'atteindre c directement
      if(!Traitement[c] && tableau2D[app][c] && distance[app] != maximum && (distance[app]+tableau2D[app][c])<distance[c])
       distance[c] = distance[app] + tableau2D[app][c];
     }
   }

  printf("V"); // Marqueur pour le Javascript qui permet de savoir que l'on est sur Dijkstra.
  for (int i = 0; i < C; i++) // Display
   printf("%d-%d,", i, distance[i]); 
}


void Graph::prims()
{
  int parent[C];
  int cle[C];
  bool set[C];
  cle[0]=0;
  parent[0]= -1;

  //Initialisation des tableaux a la valeur MAX.
  for(int a = 0 ; a < C;a++)
   {
    cle[a]=INT_MAX;
   }

  for(int i=0; i<C; i++)
   {
    set[i]=false;
   }
  //On part du noeud 0 par defaut


  for(int cp=0;cp < C-1; cp++) // C-1 car le graph n'est pas orienté, lorsqu'on a traite tous les voisins de C-1 noeuds, on a forcement pris compte des arretes du dernier noeud.
   {
    int u = Distanceminimum(cle,set); // renvoie la distance minimal
    set[u]=true;
    for(int c=0; c<C ;c++)
     {
      if(tableau2D[u][c] && set[c]==false && tableau2D[u][c]<cle[c]) //condition permettant de recuperer les voisins non deja traités et dont l'ecart avec le noeud que l'on traite serait inf. a l'ecart avec ses voisins deja traités 
       {
        parent[c] = u;
        cle[c] = tableau2D[u][c];
       }
     }
   }

  printf("P"); // Marqeur pour savoir si on est sur Prims dans la chaine de caractere.
  for (int k = 1; k < C ; k++) // Display
   {
    printf("%d-%d %d,",parent[k],k,tableau2D[k][parent[k]]); // virgule permet de savoir que l'on est sur une arrete differente
   }
}

void Graph::Display()
{
  for(int x = 0; x < C ; x++)
   {
    for(int y = 0 ; y < x ; y++) // on affiche juste la partie superieur du tableau
     {
      if(tableau2D[x][y] != 0)
       {
        printf("%d-%d %d,",x,y,tableau2D[x][y]);
       }

     }
   }
}


int main(void)
{
  static char buffer[1000]; // Init du buffer char a 100 case
  setbuf(stdout, NULL); // Sortie standard

  int sommet = 0; // Init sommet a 0
  int densite = 0; // Init densite a 0
  int source = 0 ; // Init source a 0
  scanf("%d %d %d", &sommet, &densite,&source); //  On recup les entiers envoyes par le serveur

  Graph a(sommet,densite); //  creation de la matrice d'adjacence
  a.isConnexe(sommet); // verification de la connexite du graph
  a.Display(); // Affichage du graph
  a.dijkstra(source); // effectue Djikstra

  a.prims(); // Effectue l'arbre couvrant minimum
  printf("\n"); // Saut de ligne obligatoire pour le websocket
}

// Tout le traitement des sorties printf, s'effectue dans le javascript en
// effectuant du Parsing.
