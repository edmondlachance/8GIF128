
//Cette fonction retourne une fonction qui multiplie par 5 a l'aide d'une closure
function multiplier(factor) {
	return function(number) {
		return number * factor;
	}
}

var multiplie_par_deux = multiplier(2);

var resultat = multiplie_par_deux(5);
console.log(resultat);

document.body.innerHTML = resultat;
