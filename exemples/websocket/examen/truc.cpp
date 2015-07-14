#include <stdio.h>
#include <vector>
#include <string>
#include <iostream>
using namespace std;

struct patate
{
	string name;
	int price;
	int count;
};

struct algo
{
	int z;
	vector<patate> best;
	vector<patate> current;

	void secret(int money, int y)
	{
		if (money < 0) return;
		if (y >= z) {
			return;
		}
		if (money == 0 && y < z)
		{
			z = y;
			best = current; //copier vector
			return;
		}
		for (int i = 0; i < current.size(); i++)
		{
			current[i].count++;
			secret(money - current[i].price, y+1);
			current[i].count--;
		}
		return;
	}
};

int main(void)
{
	setbuf(stdout, NULL);
	int money = 0;
	char name[100];
	int price;
	vector<patate> patates;
	scanf("%d\n", &money);
	while (1) {
	int ret = scanf("%s %d\n", name, &price);
	if (ret == 0) {
		printf("Erreur dans le format de la liste\n");
		exit(1);
	}
	if (strcmp(name, "#") == 0)
		break;
	patate a;
	a.count = 0;
	a.name = name; //constructeur par copie
	a.price = price;
	patates.push_back(a);
	}
	algo d;
	d.z = INT_MAX;
	d.current = patates;
	d.secret(money, 0);
	string output = "";
	char format[500];
	output += "[";
	for (int i = 0; i < d.best.size(); i++) {
		if (i != 0) output+= ",";
		sprintf(format, "{\"name\":\"%s\",\"price\":%d,\"count\":%d}", 
		d.best[i].name.c_str(), d.best[i].price, d.best[i].count);
		output += format;
	}
	output += "]";
	cout << output << endl;
	return 0;
 
}