// Example of true prototypical inheritance style 
// in JavaScript.


//A DÉBOGUER DANS FIREFOX OU CHROME TOOLS
//Faire du pas a pas pour la compréhension

 
// "ex nihilo" object creation using the literal 
// object notation {}.
var foo = {name: "foo", one: 1, two: 2};
 
// Another "ex nihilo" object.
var bar = {two: "two", three: 3};
 
// Gecko and Webkit JavaScript engines can directly 
// manipulate the internal prototype link.
// For the sake of simplicity, let us pretend 
// that the following line works regardless of the 
// engine used:
bar.__proto__ = foo; // foo is now the prototype of bar.
 
// If we try to access foo's properties from bar 
// from now on, we'll succeed. 
bar.one // Resolves to 1.
 
// The child object's properties are also accessible.
bar.three // Resolves to 3.
 
// Own properties shadow prototype properties
bar.two; // Resolves to "two"
bar.name; // unaffected, resolves to "foo"
foo.name; // Resolves to "foo"

delete bar.two;

console.log(bar);

console.log(bar.two);

var e = Object.create(null);
e.nom = "Ed";

bar.__proto__ = e;

console.log(bar);

console.log(bar.two);
console.log(bar.nom);


//La fonction = un objet. On peut utiliser ça pour faire des objets en utilisant la syntaxe des fonctions.
//Les objets crees de cette façon viennent avec plus de stock
//En Javascript, seul les fonctions créent des namespace (espaces de noms). 
//Puisque les fonctions peuvent tout contenir, on peut écrire les programmes dans des fonctions et les utiliser pour gérer les noms et ne pas polluer l'espace global
function Chien(name, age) {
   // Attributes
   this.name = name;
   this.age = age;
}


var chien1 = new Chien("a", 1); //cree un objet qui prend le prototype "Chien" et appelle le constructeur en meme temps
var chien2 = {};
chien2.__proto__ = Chien;
chien2.nom = "a";
chien2.age = 1;


//Les objets crées avec fonction ont un objet prototype qui peut être utilisé pour rajouter des propriétés
Chien.prototype.bruit = "wouf";
Chien.couleur = "bleu";

//Autre façon de déclarer objet
var Chien3 = {
	name : "",
	age : 0,
	couleur : "bleu",
}

//Déclarer un objet qui prend Chien3 comme prototype (encore une fois, syntaxe équivalente)
var Aatu = Object.create(Chien3);
Aatu.nom = "Aatu";
//Remplacement complet de l'instance par une autre. Le garbage collector s,occupe du reste
Aatu = Chien3;

//Déclarer un objet sans prototype
var a = Object.create(null);
a.nom = "fred";
//L'objet a est tout petit, aucune prototype ou autre propriété


var tableau = [];
//Utiliser le prototype pour ajouter des fonctions a un ensemble d'objets
for (var i = 0; i < 5; i++) {
	tableau.push(Object.create(Chien));
}

Chien.couleur = "waf";

for (var i = 0 ; i < tableau.length; i++) {
	console.log ( tableau[i].couleur);
}


var u = 2+2;
var u = 2+2;
var u = 2+2;
var u = 2+2;
var u = 2+2;



var thing1 = function(){
}

thing1.prototype = {    
     showMe: function(value){        
          console.log(value);    
     }
}

var thing2 = function(){
}

thing2.__proto__ = thing1.prototype;

thing2.showMe('I can use the showMe fuction from my ancestor!');


/* Autre façon de faire le prototype
*/
function f1() {}
f1.prototype.showMe = function(value) {
	console.log(value);
}
var f2 = {};
f2.__proto__ = f1.prototype;
f2.showMe("f2->f1.prototype->showMe");
f1.allo = "allo";
//allo existe juste dans f1, car on ne l'a pas mis dans le prototype
console.log("f2.allo est " + f2.allo);

//si on fait ça par contre, la propriété allo va être trouvée dans le prototype
f1.prototype.allo = "allo";
console.log("f2.allo est " + f2.allo);

f1.allo = "Bonjour";
f2.__proto__ = f1;
console.log("f2.allo est " + f2.allo); //devrait etre bonjour ici


/* Exemple de constructeur */

function Box(color) // Constructor
{
	//définit une variable de l'objet
    this.color = color; //même chose que faire Box.color = color
}

//On va mettre les fonctions de Box dans son prototype, comme ça les autres objets
//crees a partir de Box auront ces fonctions, et il sera possible d'en rajouter plus
//tard
Box.prototype.getColor = function()
{
    return this.color;
}

//Utilisation. Opérateur new crée un objet Box 
//Voici une syntaxe equivalente var blueBox = Object.create(Box.prototype); blueBox.color = "bleu";
var blueBox = new Box("blue");  
console.log(blueBox.getColor()); // will alert blue

//Autre exemple avec namespace
//

//Définit objet Box2 avec constructeur
function Box2(col)
{
	//variable locale a la fonction
   var color = col;

   this.getColor = function()
   {
       return color;
   }
}

Box2("vert");
console.log ( Box2.getColor() );

var u = 2+2;

