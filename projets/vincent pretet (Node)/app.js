var express = require('express'), 
    app = require('express')(),
    path = require('path'),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'); // encode and decode HTML entities (safety equivalent to htmlentities in PHP)
    
app.use(express.static(path.join(__dirname + 'jQuery')));
app.use(express.static(path.join(__dirname + 'node_modules')));
    
// load index.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/stylesheet.css', function (req, res) {
  res.sendFile(__dirname + '/public/stylesheet.css');
});


app.get('/cytoscape.js', function (req, res) {
  res.sendFile(__dirname + '/public/cytoscape.js');
});

app.get('/jquery.js', function (req, res) {
  res.sendFile(__dirname + '/public/jquery-1.11.2.js');
});

io.sockets.on('connection', function (socket, pseudo) {

    socket.on('new_graph', function(new_graph) {
        var graph = {};
        graph.vertices = ent.encode(new_graph.vertices);
        graph.density = ent.encode(new_graph.density);
        graph.edges = computeEdges(graph.vertices, graph.density);
        
        graph = generateEdgeList(graph);
        graph.tableau = [1,4,8];
        socket.emit('graph', graph);

    });
});

server.listen(8080);

/* utility functions */
var computeEdges = function (vertices, density) {
    return 1 / 2 * ( ( density * 0.01 )* vertices * ( vertices - 1 ) );
}

function isInt(n) {
   return n % 1 === 0;
}

function generateEdgeList(new_graph) {
  new_graph.edgeList = [];
  
  var nbOfEdges = new_graph.edges;
  
  if ( ! isInt( nbOfEdges ) ) return false;
  
  var availableVertices = [];
  for (var i = 0; i < new_graph.vertices; i++) {
    availableVertices.push(i);
  }
  
  var verticesPool = availableVertices.slice(0);
  var nbOfEdgesAdded = 0;
  
  for (var i = 0; i < new_graph.vertices; i++) {
    
    var verticesPool = availableVertices.slice(0);
    verticesPool.splice(i, 1);
    
    var targetVertex = verticesPool[ Math.floor( Math.random() * verticesPool.length ) ];
    
    // check if edge is unique
    var newEdge = [i, targetVertex];
    
    var addIt = true;
    
    var edgesCreated = new_graph.edgeList.length;
    
    if (edgesCreated) {
      for(var i = 0; i < edgesCreated; i++) {
        if (new_graph.edgeList[i].sameEdge(newEdge)) {
          addIt = false;
          break;
        }
      }
    }
   
    if (addIt) {
      new_graph.edgeList.push(newEdge)
      nbOfEdgesAdded++;
    }
  }
  console.log('nbOfEdges :' + nbOfEdges);
  console.log('nbOfEdgesAdded :' + nbOfEdgesAdded);
  
  while ( nbOfEdgesAdded < nbOfEdges ) {
    var sourceVertex = availableVertices[ Math.floor( Math.random() * availableVertices.length ) ];
    
    var verticesPool = availableVertices.slice(0);
    verticesPool.splice(availableVertices.indexOf(sourceVertex), 1);
    
    var targetVertex = verticesPool[ Math.floor( Math.random() * verticesPool.length ) ];
    
  // check if edge is unique
    var newEdge = [sourceVertex, targetVertex];
    
    var addIt = true;
    
    var edgesCreated = new_graph.edgeList.length;
    
    if (edgesCreated) {
      for(var i = 0; i < edgesCreated; i++) {
        if (new_graph.edgeList[i].sameEdge(newEdge)) {
          addIt = false;
          break;
        }
      }
    }
   
    if (addIt) {
      new_graph.edgeList.push(newEdge)
      nbOfEdgesAdded++;
    }
  }
  
  // transform the graph into a weighted graph
  var weight = 0;
  var min = 1;
  var max = 10;
  for (var i = 0; i < new_graph.edges; i++) {
    weight = getRandomInt(min, max);
    new_graph.edgeList[i].push(weight); console.log(typeof weight);
  }
  
  return new_graph;
}

/* function that compares two edges and returns true if identical */
Array.prototype.sameEdge = function(testArr) {
    var length = this.length;
    if (length != testArr.length) return false;
    for (var i = 0; i < length; i++) {
        if (testArr.indexOf(this[i]) == -1) { 
          return false;
        }
    }
    return true;
}

/* OTHER FUNCTIONS - found on stackoverflow */
/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}