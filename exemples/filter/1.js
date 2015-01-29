function filter(tableau, test)
{
	var resultats = [];
	for (var i = 0; i < tableau.length; i++)
	{
		if (test(tableau[i]))
			resultats.push(tableau[i]);
	}
	return resultats;
}

//On test notre fonction de degré supérieur
var tab = [1,2,3,4,5,6,7,8,9,10];

var isNumberPair = function(nombre)
{
	return nombre % 2 == 0;
}

var res = filter(tab,isNumberPair);
for (var i in res) {
	console.log(res[i]);
}
