var personnes = [ 
{prenom:'Ted Evelyn Mosby',change:10, sexe:'m'},
{prenom:'Marshall',change:0.25, sexe:'m'},
{prenom:'Lily',change:40, sexe:'f'},
{prenom:'Robin',change:20, sexe:'f'},
{prenom:'Barney',change:100, sexe:'m'}
]

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

function reduce(array, combine, start) {
  var current = start;
  for (var i = 0; i < array.length; i++)
    current = combine(current, array[i]);
  return current;
}

function ft(e) {
	if (e.sexe == 'm') return false;
	else return true;
}

function cf(current, e) {
	current.somme += e.change;
	current[e.prenom] = e.change;
	return current;
}

var res = reduce( filter(personnes, ft) , cf, {somme:0});
console.log (res);