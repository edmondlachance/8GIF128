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

console.log("\nMap : \n\n");

function map(tableau, transformation)
{
	var resultats = [];
	for (var i in tableau)
	{
		resultats.push( transformation(tableau[i]));
	}
	return resultats;
}

var res2 = map(res, 
	function(nb)
	{
		return nb*10;
    });

function logAll(tableau)
{
	for (var i in tableau)
		console.log(tableau[i]);
}

logAll(res2);


//Fonction MAP avec side effects 
function map2(tableau, transformation)
 {
 	for (var i in tableau) {
 		tableau[i] = transformation(tableau[i]);
 	}
 }


    map2(res, 
	function(nb)
	{
		return nb*10;
    });

logAll(res);