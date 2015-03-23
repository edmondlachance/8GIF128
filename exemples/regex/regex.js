//Tests de REGEX
//Voir eloquentjavascript, regular expressions

//Test est une fonction qui retourne true si le pattern est trouvé dans la string
//Observation : Les strings sont des objets (spécial) en JS

console.log("abc dans abcde:"+/abc/.test("abcde"));
console.log("abc dans abxde:"+/abc/.test("abxde"));

//indexOf est une simple recherche avec une boucle (plus rapide)
//indexOf n'utilise pas les REGEX
var res = "abcde".indexOf("abc"); //retourne 0
console.log("indexOf abc dans abcde:"+res);

//Voici comment indexof est implémenté (aussi connu sous le nom de strchr)
function strchr() 
{
	//Equivalent
	var str = "abcde";
	var pattern = "abc";
	for (var i = 0; i < str.length ; i++) {

		var k = i;
		for (var z = 0; z < pattern.length; z++)
		{
			//Si la lettre match avec le pattern
			if (str.charAt(k) == pattern.charAt(z) ) {
				if (z == pattern.length-1) return i; //return le debut du pattern
				k++;
			}
		}
	}
}

var res = strchr();
console.log("(strchr)abc dans abcde:"+res);


//[] permet de définir un ensemble de caractères
//() est un test groupé

console.log("Matcher des set de caracteres");
//Les 2 regex font la meme chose. La syntaxe 0-9 permet de définir un range


console.log(/[0123456789]/.test("in 1992"));


// → true
console.log(/[0-9]/.test("in 1992"));
// → true

//Inversion de set (très utile)
//On ne veut pas matcher aucun caractère dans le set

var notBinary = /[^01]/;
console.log(notBinary.test("1100100010100110"));
// → false
console.log(notBinary.test("1100100010200110"));
// → true


//Exemple de code vs regex
//i est un modificateur pour que ça soit pas case-sensitive
var cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo"));
// → true

//Visualisation de la state machine ici : 
//http://regexper.com/#%2Fboo%2B(hoo%2B)%2B%2Fi

//debugger;

function patternSearch(str) 
{
	//Match bo
	//Voir fct charAt
	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
	//If charAt(pos) out of bounds, ça retourne ""
	function match1(str, pos) {
		if (str.charAt(pos) == 'b' &&
		    str.charAt(pos+1) == 'o' ||
		    str.charAt(pos) == 'B' ||
		    str.charAt(pos+1) == 'O')
		    return pos+2;
		else return -1; //error, not in string
	}

	//Match o+ (1 a plusiers o)
	function match2(str, pos) {
		var num = 0; //nombre de o, minimum 1
		while (1) {
			var a = str.charAt(pos);
			if (a == 'o' || a == 'O') {
				num++;
				pos++;
			}

			else if (a == "") {
				if (num > 0) return -2; //toute la string est match
				if (num == 0) return -1; //probleme
			}

			else {
				if (num > 0) return pos;
				else return -1; //non match
			}
		}
	}

	//Match ho
	function match3(str, pos) {
		if (str.charAt(pos) == 'h' &&
		    str.charAt(pos+1) == 'o' ||
		    str.charAt(pos) == 'H' ||
		    str.charAt(pos+1) == 'O')
		    return pos+2;
		else return -1; //error, not in string
	}

	//Match le groupe ho, o
	function match4(str, pos) {

		while (1) {
			pos = match3(str, pos); //match ho
			if (pos == -1) return -1;

			pos = match2(str, pos);
			if (pos == -1) return -1;
			if (pos == -2) return -2;
		}

	}
	function testRegex(pos)
	{
		//Match bo
		pos = match1(str, pos);
		if (pos == -1) return false;
		//match o+
		pos = match2(str, pos);
		if (pos == -1) return false;
		//match (hoo+)+
		pos = match4(str, pos);
		if (pos == -1) return false;
		if (pos == -2) return true;
	}

	//Cherche toute la string
	for (var i  = 0; i < str.length; i++) 
	{
		var pos = i;
		if (testRegex(pos) == true) return true;
	}
	return false;
}

var res = patternSearch("Boohoooohoohooo");
console.log(res); //true

var res = patternSearch("aaaaaaBoohoooohoohooo");
console.log(res); //true aussi


/*
Exec permet d'avoir l'indice ou le match a été trouvé, ainsi que la string du match au complet

Dans une regex comme /boo+(hoo+)+/i, le premier resultat de exec
est le match global Boohoooohoohooo et l'autre résultat c'est le dernier groupe
qui a matche (ici, (hoo+) est un groupe) donc il se fait activement matché.
*/

var cartoonCrying = /boo+(hoo+)+/i;
var match = cartoonCrying.exec("aaBoohoooohoohooo");
console.log(match); //Array [ "Boohoooohoohooo", "hooo" ]
console.log(match.index); //2

//Replace permet de remplacer des match
//Le premier groupe (\w+) peut être référé a l'aide de $1
var re = /(\w+)\s(\w+)/;
var str = 'John Smith';
var newstr = str.replace(re, '$2 et $1');
console.log(newstr);

//String.match. Même méthode que exec sauf qu'on peut inclure le flag global
//Ce qui permet de trouver plus que 1 match
//Flag global. Répète la recherche a toute la string, même une fois
//qu'il y a déja eu un match
//debugger;
var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var regexp = /[A-E]/g;
var matches_array = str.match(regexp);

console.log(matches_array);
// ['A', 'B', 'C', 'D', 'E', 'a', 'b', 'c', 'd', 'e']

//Exemple de exec avec flag global. Il faut appeler plusieurs fois
//Pour avoir les match complets
var text = 'First line\nSecond line';
var regex = /(\S+) line\n?/g;

var match = regex.exec(text);
console.log(match[0]);        
console.log(regex.lastIndex); 

var match2 = regex.exec(text);
console.log(match2[0]);      
console.log(regex.lastIndex); 

var match3 = regex.exec(text);
console.log(match3 === null); 

//Exemple de backtrack
/*
Lorsqu'une expression doit choisir entre plusieurs branches
(opérateur |), elle va d'abord tenter la premiere branche.
Si ça marche pas, elle essaie alors la 2eme, et la 3eme etc.
On dit alors que l'algorithme "backtrack".

L'implémentation en code de ce comportement utilise justement une 
recursion backtrack

voir l'article sur swtch.com (dans les comments des slides) pour un algorithme
qui backtrack pas.
*/

//Matcher soit 0000111b, soit 43434, (soit 34h ou 3Ah)
//Trouvé une erreur dans sa regex (eloquentJavascript)
var regex = /\b([01]+b|\d+|[\da-f]+h)\b/;
var str = 4343;
console.log ("Hexa, decimal ou binaire?:"+regex.test(str) );

//String replace
//Le flag g remplace tous les matchs
console.log("Borobudur".replace(/[ou]/, "a"));
// → Barobudur
console.log("Borobudur".replace(/[ou]/g, "a"));
// → Barabadar

//Replace utilisé avec une fonction
var s = "the cia and fbi";
console.log(s.replace(/\b(fbi|cia)\b/g, function(str) {
  return str.toUpperCase();
}));
// → the CIA and FBI











