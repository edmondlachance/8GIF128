var a = 10;
var b = 10;

function obj()
{

  this.a = 1;
  this.b = 1;
  var a = 5;
  var b = 5;

  function imprimer()
  {
    console.log(a+b);
  }

  this.imprimer = function() {
    console.log(this.a+this.b);
  }

  imprimer();
}

var e = new obj();

obj.prototype.imprimer = function() {
  console.log(this.a-this.b);
}

e.imprimer();

var f = Object.create(e);

f.imprimer();

f.__proto__ = obj.prototype;
f.a = 50;
f.b = 50;

f.imprimer();

var g = new obj()
g.imprimer()


