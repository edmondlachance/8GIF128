#include <iostream>
#include <math.h>
#include <time.h>
#include <fstream>
#include <string>
#include <vector>
#include <list>
#include <queue>
using namespace std;

class arete
{
public:
	int sommet1;
	int sommet2;
	int poids;
};

/*
 * Declaration de la classe
 */
class Graph
{
    private:
        int Taille; // Taille du graph
        list<int> *adj;
    public:
        Graph(int Taille)
        {
            this->Taille = Taille;
            adj = new list<int>[Taille];
        }
        void addEdge(int Sommet1, int Sommet2);
        void BFS(int s, bool Visite[]);
        bool isConnected(int n);
};
 
/*
 * Ajouter une arete pour connecter v et w
 */
void Graph::addEdge(int Sommet1, int Sommet2)
{
    adj[Sommet1].push_back(Sommet2);   // Ajouter une arête entre le sommet 1 et 2  
    adj[Sommet2].push_back(Sommet1);  // Ajouter une arête entre le sommet 2 et 1 
}
 
void Graph::BFS(int s, bool Visite[])   // Algorithme de parcours en largeur
{
    list<int> Liste;
    list<int>::iterator i;
    Visite[s] = true;   // Le sommet est visite
    Liste.push_back(s);   // On ajoute le sommet à la liste des sommets visités
    while (!Liste.empty())  // Tant qu'il reste des sommets
    {
        s = Liste.front();
        Liste.pop_front();  // Enlève un sommet de la liste
        for(i = adj[s].begin(); i != adj[s].end(); ++i)   // Regarde si le sommet est connecte a d'autres sommets
        {
            if(!Visite[*i])  // Si l'autre somemt de l'arete n'est pas encore visite avec le sommet s
            {
                Visite[*i] = true;  // On visite l'autre sommet avec le sommet s
                Liste.push_back(*i);
            }
        }
    }
}

/*
 * Vérifie si le graph est connexe ou pas
 */
bool Graph::isConnected(int n)
{
    bool *visite = new bool[n];  // Allocation dynamique pour voir si tous les sommets sont visités
    for (int i = 0; i < Taille; i++)  
        visite[i] = false;  // Par defaut , visite est faux pour tous les sommets
    BFS(0, visite);  // On utilise un algorithme de parcours en largeur pour savoir si il est visite en commençant par le premier sommet
    for (int i = 0; i < Taille; i++)
        if (visite[i] == false)
            return false;   // Si ce sommet n'est pas visite, le graph n'est pas connexe
	delete [] visite;   // Supprime l'allocation dymanique
    return true;  // Le graph est connexe
}

void main(void)
{
	const int MAX_POIDS = 10;
	int n = 0;
	int nbrAretes = 0;
	int densite = 0;
	string Chaine;

	vector <arete> lesAretes;

	getline(cin, Chaine);

	if(Chaine.find('!') < 100)
		n = 4;
	else
		n = atoi(Chaine.c_str());

	cin >> densite;

	//fait en sorte que le random soit différent à chaque exécution du code 
	srand(time(NULL));

	//On se cree une table Sommet X Sommet pour ne pas générer des arêtes pour les memes sommets plusieurs fois
	vector<vector<int>> connexions(n, vector<int>(n)); //deja initialisé à 0

	if (densite != 0) {
		//Pour tous les sommets
		for (int i = 0; i < n; i++)
		{
			//on va donner une chance de (densite%) à chaque sommet i d'avoir un lien avec chaque sommet j
			//on a plus d'itérations parce que plusieurs aretes existent deja.
			for (int j = 0; j < n; j++)
			{
				arete arete;
				arete.poids = rand() % MAX_POIDS + 1; //valeurs en 1 et 10
				arete.sommet1 = i;
				arete.sommet2 = j;
				
				//arete.sommet2 = rand() % n; //valeurs de 0 à n-1 (indices des sommets)

				//On ne veut pas d'arete d'un sommet sur lui-même
				if (arete.sommet1 == arete.sommet2)
					continue;
				if (connexions[arete.sommet1][arete.sommet2] == 1 || connexions[arete.sommet2][arete.sommet1] == 1)
					continue;
				else 
				{
					int valeurAleatoire = rand() % (100 / densite);
					if (valeurAleatoire == 0) 
					{
						connexions[arete.sommet1][arete.sommet2] = 1;
						connexions[arete.sommet2][arete.sommet1] = 1;
						lesAretes.push_back(arete);
					}
				}
			}
		}
	}

	ofstream FicEntree;
	FicEntree.open("Autres/aretes.txt");

	//affichage des aretes dans la console
	cout << endl << n << " " << lesAretes.size() << endl;
	FicEntree << n << " " << lesAretes.size() << endl;

	for (int i = 0; i < lesAretes.size(); i++)
	{
		cout << lesAretes[i].sommet1 << " " << lesAretes[i].sommet2 << " " << lesAretes[i].poids << endl;
		FicEntree << lesAretes[i].sommet1 << " " << lesAretes[i].sommet2 << " " << lesAretes[i].poids << endl;
	}
	FicEntree << "#";
	FicEntree.close();

	ifstream Fichier;
	Fichier.open("Autres/aretes.txt");  
	string s1, s2;  // Sommets
	int ValeurEntiere1 = 0, ValeurEntiere2 = 0;  // Valeur entiere des sommets
	Graph g(n);   // Graph contenant n sommets
	string prendretoutelaligne;   // Pour ignorer le reste de la ligne dans un getline
	bool zero = false;   // Pour voir si le sommet 0 est present dans le graph

	if (!Fichier.fail())
	{
		getline(Fichier, prendretoutelaligne);  // Ignorer le nombre de sommets et la densité
		while(!Fichier.eof())
		{
			getline(Fichier, s1, ' ');    // Prendre le sommet1
			getline(Fichier, s2, ' ');  // Prendre le sommet2
			getline(Fichier, prendretoutelaligne);   // Ignorer le reste de la ligne

			if (s1.find('#'))    // Si la fin du fichier n'est pas atteinte
				ValeurEntiere1 = atoi(s1.c_str());   // Transformer sommet1 en entier

			ValeurEntiere2 = atoi(s2.c_str());   // Transformer sommet2 en entier

			if (ValeurEntiere1 == 0 || ValeurEntiere2 == 0)   // Si le sommet 0 est connecté à un autre sommet
				zero = true;

			g.addEdge(ValeurEntiere1,ValeurEntiere2);  // Ajouter l'arête
			}
	}

	else
		cout << "Erreur a l'ouverture du fichier";

    if (zero == false)   // Si il n'y a pas de sommet 0, le graph n'est pas connexe
        cout<<"2000"<<endl;
	else
	{
		if (g.isConnected(n))  // Teste si le graph est connexe
			cout<<"1000"<<endl;
		else     // Le graph n'est pas connexe
			cout<<"2000"<<endl;
	}
	
	Fichier.close(); 
}