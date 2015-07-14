#include "tree.h"
#define SIZEDEFAULT 10

    Graph::Graph()
    {
        nbPoint = 10;
        density=100;
        weightRangeInf=0;
        weightRangeSup=6;


        std::vector<int> rowvector;
        for(int i=0; i<SIZEDEFAULT; i++)
        {
            rowvector.clear();
            for(int j=0; j<SIZEDEFAULT; j++)
                rowvector.push_back(-1);
            weight.push_back(rowvector);
        }

        nbLink = 0;
    }

    Graph::Graph(int nbPointP, int densityP, int weightRangeInfP, int weightRangeSupP)
    {
        nbPoint = nbPointP;
        density = densityP;
        weightRangeInf = weightRangeInfP;
        weightRangeSup = weightRangeSupP;

        std::vector<int> rowvector;
        for(int i=0; i<nbPointP; i++)
        {
            rowvector.clear();
            for(int j=0; j<nbPointP; j++)
                rowvector.push_back(-1);
            weight.push_back(rowvector);
        }
        nbLink = 0;
        CreateGraph();
    }

    Graph::Graph(int nbPointP, bool FromBuffer){
        nbPoint = nbPointP;
        std::vector<int> rowvector;
        for(int i=0; i<nbPointP; i++)
        {
            rowvector.clear();
            for(int j=0; j<nbPointP; j++)
                rowvector.push_back(-1);
            weight.push_back(rowvector);
        }
        nbLink = 0;
        if(FromBuffer){
            CreateGraphFromBuffer();
        }
    }

    void Graph::CreateGraphFromBuffer(){
        char line[100];
        while (1) {
            gets(line);
            if (line[0] == '#')
                //Ferme la lecture de stdin une fois que # est trouvé
                break;
            int s1,s2,p;
            sscanf(line, "%d %d %d", &s1, &s2, &p);
            weight[s1][s2] = p;
            weight[s2][s1] = weight[s1][s2];
            nbLink++;
        }
    }

    void Graph::CreateGraph(){
        srand(time(NULL));
        for(int i=0;i<nbPoint;i++){
            for (int j = i; j < nbPoint; j++)
            {
                if (rand()%100 < density)
                {
                    weight[i][j] = rand() %(weightRangeSup - weightRangeInf + 1) + weightRangeInf;
                    weight[j][i] = weight[i][j];
                    nbLink++;
                }
                else
                {
                    weight[i][j] = -1;
                    weight[j][i] = weight[i][j];
                }
            }
        }
    }

    void Graph::sssp(int a, int b)
    {
        mark.clear();
        wayto.clear();

        for(int j=0; j<nbPoint; j++)
            mark.push_back(-1);
        mark[a] = 0;

        for(int j=0; j<nbPoint; j++)
            wayto.push_back(-2);
        wayto[0] = a;

        if (sssprec(a, b, 1)){
            printf("%d\n", nbPoint);
            int s1, s2, p;
            int i = 0;
            s1=wayto[i];
            i++;
            while (s1 != b)
            {
                s2=wayto[i];
                p=weight[s1][s2];
                printf("%d %d %d\n",s1, s2, p);
                s1=s2;
                i++;
            }
            printf("#\n");
        }
        else
        {
            printf("0\n#\n");
            wayto.clear();
        }
    }

    bool Graph::sssprec(int a, int b, int p)
    {
        bool test=false;
        int nb=-1;
        if (a != b)
        {
            for (int i = 0; i < nbPoint; i++)
            {
                if (weight[a][i] != -1 && a != i)
                {
                    if (mark[i] == -1 || mark[a] + weight[a][i] < mark[i])
                    {
                        mark[i] = mark[a] + weight[a][i];
                        if(sssprec(i, b, p+1)){
                            test=true;
                            nb=i;
                        }
                    }
                }
            }
            if(test){
                wayto[p]=nb;
            }
            return test;
        }
        else{
            return true;
        }
    }


    bool Graph::ssp(int a, int b)
    {
        mark.clear();

        for(int j=0; j<nbPoint; j++)
            mark.push_back(-1);
        mark[a] = 0;

        return(ssprec(a, b));
    }

    bool Graph::ssprec(int a, int b)
    {
        if (a != b)
        {
            for (int i = 0; i < nbPoint; i++)
            {
                if (weight[a][i] != -1 && a != i)
                {
                    if (mark[i] == -1)
                    {
                        mark[i] = mark[a] + weight[a][i];
                        if(ssprec(i, b)){
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        else{
            return true;
        }
    }

    void Graph::PrintGraphLink()
    {
        printf("%d\n",nbPoint);
        for (int i = 0; i < nbPoint; i++)
        {
            for (int j = i; j < nbPoint; j++)
            {
                if (weight[i][j] != -1)
                {
                    printf("%d %d %d\n",i,j,weight[i][j]);
                }
            }
        }
        printf("#\n");
    }

    void Graph::changeWeight(int i, int j, int p){
        if(weight[i][j]==-1){
            if(p!=-1){
                nbLink++;
            }
            weight[i][j]=p;
            weight[j][i]=weight[i][j];
        }
        else{
            if(p==-1){
                nbLink--;
            }
            weight[i][j]=p;
            weight[j][i]=weight[i][j];
        }
    }

    void Graph::solveMinSpanTree(){

        Graph minSpan(nbPoint,false);

        std::vector<struct edge> edge;
        int k=0;

        for (int i = 0; i < nbPoint; i++)
        {
            for (int j = i; j < nbPoint; j++)
            {
                if (weight[i][j] != -1)
                {
                    k++;
                    struct edge e;
                    e.start=i;
                    e.end=j;
                    e.weight=weight[i][j];
                    edge.push_back(e);
                }
            }
        }

        for(int i=0;i<nbLink;i++){
            int min=edge[i].weight,indiceMin=i;
            for(int j=i+1;j<nbLink;j++){
                if(edge[j].weight<min){
                    min=edge[j].weight;
                    indiceMin=j;
                }
            }
            struct edge temp;
            temp.start = edge[i].start;
            temp.end = edge[i].end;
            temp.weight = edge[i].weight;

            edge[i].start = edge[indiceMin].start;
            edge[i].end = edge[indiceMin].end;
            edge[i].weight = edge[indiceMin].weight;

            edge[indiceMin].start = temp.start;
            edge[indiceMin].end = temp.end;
            edge[indiceMin].weight = temp.weight;
        }

        for(int i=0;i<nbLink;i++){
            if(!minSpan.ssp(edge[i].start,edge[i].end)){
                minSpan.changeWeight(edge[i].start,edge[i].end,edge[i].weight);
            }
        }
        minSpan.PrintGraphLink();
    }

    void Graph::PrintGraph()
    {
        for (int i = 0; i < nbPoint; i++)
        {
            for (int j = 0; j < nbPoint; j++)
            {
                if (weight[i][j] == -1)
                {
                    printf("  _ |");
                }
                else
                {
                    printf("%3d |",weight[i][j]);
                }
            }
            printf("\n");
        }
    }
