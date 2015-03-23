var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8070);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

//Parcours DFS du graphe
var output = "";

function dfs(vertex, graph) {
    if (graph[vertex].visited == true) return;
    //Marquer comme visite
    graph[vertex].visited = true;
    //Explorer les voisins en mode DFS
    var e = graph[vertex].adjlist;
    for (var i = 0; i < e.length; i++) {
        if (e[i] == 1 && graph[i].visited == false) {
            output += vertex + " -> " + i + "\n";
            dfs(i, graph);
        }
    }
}
io.on('connection', function(socket) {
    //On reçoit le graphe
    socket.on('input_graph', function(data) {
        output = ""; //il faut juste clearer l'output avant un nouveau job
        var graph = [];
        //Array of lines
        var lines = data.split("\n");
        var n = lines[0] | 0; //transformer en int
        delete lines[0]; //mettre ligne 0 comme undefined

        //Creation de la struct
        for (var i = 0; i <= n; i++) {
            graph[i] = {};
            graph[i].visited = false;
            graph[i].adjlist = [];
            graph[i].i = i;
        }

        lines.forEach(function(e) {
            if (e != undefined) {
                var a = e.split(" ");
                var s1 = a[0];
                if (s1 == "#") return; //skip diese
                var s2 = a[1];
                graph[s1].adjlist[s2] = 1;
                graph[s2].adjlist[s1] = 1;
            }
        });
        //Envoyer le json au browser. Il sera affiche dans la console du browser
        socket.emit('graph_json', graph);
        console.log(graph); //affiche dans la console du serveur
        dfs(0, graph);
        console.log(output);
        socket.emit('output', output);
    });
});