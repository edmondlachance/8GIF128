#include <iostream>
#include <math.h>
#include <time.h>
#include <fstream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class arete
{
public:
	int sommet1;
	int sommet2;
	int poids;
};

bool sortComp(arete a1, arete a2)
{
	return (a1.poids < a2.poids);
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

bool estConnexe(vector<int> un)
{
	int depart = un[0];
	if (!(depart == -1))
		for (int i = 0; i < un.size(); i++)
		{
			if (un[i] != un[0]) return false;
		}
	else return false;
	return true;
}

//algo minimumSpanningTree()
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

	std::sort(lesAretes.begin(), lesAretes.end(), sortComp); //trier les aretes

	vector<arete> T;

	vector<int> unionFind(n);
	for (int i = 0; i < n; i++)
		unionFind[i] = -1;

	int compteur = 0;
	int numGroupe = 1;
	int poidsMin = 0;

	while (!estConnexe(unionFind))
	{
		arete a = lesAretes[compteur];
		int urep = unionFind[a.sommet1];
		int vrep = unionFind[a.sommet2];
		if (urep != vrep)
		{
			if (unionFind[a.sommet2] != -1)
			{
				int valeurAChanger = unionFind[a.sommet1];
				if (valeurAChanger != -1)
					for (int i = 0; i < unionFind.size(); i++)
					{
						if (unionFind[i] == valeurAChanger)
							unionFind[i] = unionFind[a.sommet2];
					}
				else
					unionFind[a.sommet1] = unionFind[a.sommet2];
			}
			else
				unionFind[a.sommet2] = unionFind[a.sommet1];
			T.push_back(a);
			poidsMin += a.poids;
		}
		else if (urep == -1 && vrep == -1)
		{
			unionFind[a.sommet1] = unionFind[a.sommet2] = numGroupe;
			numGroupe++;
			T.push_back(a);
			poidsMin += a.poids;
		}
		
		compteur++;
	}

	//envoie des informations au websocket
	cout << "Le poids du graphe minimal est: " << poidsMin << endl;
	for (int i = 0; i < T.size(); i++)
	{
		cout << T[i].sommet1 << ' ' << T[i].sommet2 << ' ' << T[i].poids << endl;
	}
	fichierAretes.close();

}