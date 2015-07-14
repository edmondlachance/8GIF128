#ifndef TREE_H_INCLUDED
#define TREE_H_INCLUDED
#include <list>
#include <vector>
#include <cstdlib>
#include <stdio.h>
#include <time.h>

struct edge{
    int start;
    int end;
    int weight;
};

class Graph
{
    private:
        //Point des liaisons
        //int ** weight;
        std::vector< std::vector< int > > weight;
        //Nombres de Points du graph
        int nbPoint;
        //Densité du graph
        int density; //between 0 & 100
        //Delimitation du poids d'une liaison
        int weightRangeInf,weightRangeSup;
        //Nombre de lien dans le graph
        int nbLink;
        //
        std::vector<int> mark;
        //Chemin sous forme de liste
        std::vector<int> wayto;

        bool sssprec(int a, int b, int p);

        bool ssprec(int a, int b);

    public:
        //Constructeur default
        Graph();

        Graph(int nbPoint,bool FromBuffer);
        //Constructeur
        Graph(int nbPoint, int density, int weightRangeInf, int weightRangeSup);

        //Crée le Graph
        void CreateGraph();

        void CreateGraphFromBuffer();
        //
        void sssp(int a, int b);

        bool ssp(int a, int b);

        //
        void PrintGraphLink();

        void PrintGraph();
        //
        void solveMinSpanTree();

        void changeWeight(int i, int j, int p);
};

#endif // TREE_H_INCLUDED
