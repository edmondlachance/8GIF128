
#include <iostream>
#include <math.h>
#include <time.h>
#include <fstream>
#include <string>
#include <vector>
using namespace std;

class arete
{
public:
	int sommet1;
	int sommet2;
	int poids;
};

bool dejaExplore(vector <int> S, int sommet)
{
	for(int i = 0; i< S.size(); i++)
	{
		if(S[i] == sommet)
		{
			return false;
		}
	}
	return true;
}

void Dijkstra(vector <arete> lesAretes, int n)
{
	int valeurminimale  = 1000, indice = -1, SommetDepart;

	//cout << endl << "RECHERCHE DU PLUS COURT CHEMIN" << endl;
	//cout << endl << "Sommet de depart " << endl;
	cin >> SommetDepart;


	vector<int> S;
	vector<int> D(n);
	vector<vector<int>> Matrice(n, vector<int>(n));
	for(int i =0; i < n; i++)
	{
		for(int j =0; j < n; j++)
		{
			Matrice[i][j] = 1000;
			Matrice[j][i] = 1000;
		}
	}
	for(int i =0; i < n; i++)
	{
		Matrice[i][i] = 0;
	}
	for(int i =0; i < lesAretes.size(); i++)
	{
		Matrice[lesAretes[i].sommet1][lesAretes[i].sommet2] = lesAretes[i].poids;
		Matrice[lesAretes[i].sommet2][lesAretes[i].sommet1] = lesAretes[i].poids;
	}
	for(int j = 0; j < n; j++) 
	{
		D[j] = Matrice[SommetDepart][j];
	}
	for(int j = 0; j < n-2; j++) 
	{
		for(int v = 0; v < D.size(); v++)
		{
			valeurminimale = 1000;
			if(D[v] < valeurminimale && D[v] != 0 && dejaExplore(S,v))
			{
				valeurminimale = D[v];
				indice = v;
			}
		}
		S.push_back(indice);
		for(int w=0; w<n;w++)
		{
			if( D[w] > (D[indice] + Matrice[indice][w]))
			{
				D[w] = (D[indice] + Matrice[indice][w]);
			}
		}
	}
	//cout << endl << endl;
	for(int k=0;k<D.size();k++)
	{
		if(SommetDepart != k)
			cout << SommetDepart << " -> " << k << " = " << D[k] << endl;
	}
}

int toInt(string s)
{
	int val = 0;
	for (int i = 0; i < s.length(); i++)
	{
		val *= 10;
		val += s[i] - '0';
	}
	return val;
}

void main(void)
{
	ifstream fichierAretes;
	fichierAretes.open("Autres/aretes.txt");

	vector<arete> lesAretes;
	string s1, s2, s3;

	getline(fichierAretes, s1, ' ');
	int n = toInt(s1);
	getline(fichierAretes, s1, '\n');
	do
	{
		getline(fichierAretes, s1, ' ');
		if (!(s1 == "#"))
		{
			getline(fichierAretes, s2, ' ');
			getline(fichierAretes, s3, '\n');
			arete a;
			a.sommet1 = toInt(s1);
			a.sommet2 = toInt(s2);		
			a.poids = toInt(s3);
			lesAretes.push_back(a);
		}
	} 
	while (s1 != "#");

	Dijkstra(lesAretes, n);

	fichierAretes.close();
}
