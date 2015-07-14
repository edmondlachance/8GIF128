var s;
var json;
var graph;


function init() {
    sigma.renderers.def = sigma.renderers.canvas;

    s = new sigma({
        container: 'sigma'
    });
    graph = new Object();
}

function test_graph() {

    s.graph.addNode({
        id: 'n0',
        label: 'Hello',
        x: 0,
        y: 0,
        size: 1,
        color: '#f00'
    }).addNode({
        id: 'n1',
        label: 'World!',
        x: 1,
        y: 1,
        size: 1,
        color: '#00f'
    }).addEdge({
        id: 'e0',
        source: 'n0',
        target: 'n1'
    });

    s.refresh();

    /*var dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);

    dragListener.bind('startdrag', function(event) {
        console.log(event);
    });

    dragListener.bind('drag', function(event) {
        console.log(event);
    });

    dragListener.bind('drop', function(event) {
        console.log(event);
    });

    dragListener.bind('dragend', function(event) {
        console.log(event);
    });*/
}

function draw_graph() {
    s.graph.clear();
    test_graph();
}

function reset_colors() {
    for (var i = 0; i < graph.nodes.length; i++) {
        graph.nodes[i].color = '#777';
    }
    for (var i = 0; i < graph.edges.length; i++) {
        graph.edges[i].color = '#777'
    }
}

function test_load() {
    s.graph.clear();
    console.log(graph);
    for (var i = 0; i < graph.nodes.length; i++) {
        s.graph.addNode(graph.nodes[i]);
    }
    for (var j = 0; j < graph.edges.length; j++) {
        s.graph.addEdge(graph.edges[j]);
    }
    s.refresh();
}

function load_graph(input) {

    var lol = "4\n0 1 3\n1 2 4\n2 3 2\n#";
    var tmp = new Array();
    tmp = input.split('\n');

    var indies = new Array();
    var j = 0;
    for (var i = 1; i < tmp.length - 1; i++) {
        indies[j] = new Array();
        indies[j] = tmp[i].split(' ');
        j++;
    }

    var nodes = new Array();
    var edges = new Array();

    var node_pos = new Array();
    for (var i = 0; i <= parseInt(tmp[0]); i++) {
        node_pos[i] = new Array();
        for (var j = 0; j <= parseInt(tmp[0]); j++) {
            node_pos[i][j] = 0;
        }
    }

    for (var i = 0; i < parseInt(tmp[0]); i++) {
        var node = new Object();
        node.id = i.toString();
        node.label = i.toString();
        var x;
        var y;
        do {
            x = Math.floor(Math.random() * parseInt(tmp[0])) + 1;
            y = Math.floor(Math.random() * parseInt(tmp[0])) + 1;
        } while (node_pos[x][y] != 0);
        node.x = x;
        node.y = y;
        node_pos[x][y] = 1;
        node.size = 1;
        node.color = '#777';
        nodes.push(node);
    }

    for (var i = 0; i < indies.length; i++) {
        var edge = new Object();
        var wid = (indies[i][0] < indies[i][1]) ? indies[i][0].toString() + "-" + indies[i][1].toString() : indies[i][1].toString() + "-" + indies[i][0].toString();
        edge.id = wid;
        edge.label = indies[i][2].toString();
        edge.source = indies[i][0].toString();
        edge.target = indies[i][1].toString();
        edge.color = '#777';
        edges.push(edge);
    }

    graph = new Object();
    graph.nodes = nodes;
    graph.edges = edges;
    console.log(indies);
    json = JSON.stringify(graph, null, 2);

    test_load();
}



function update_path(input) {
    reset_colors();
    var lol = "4\n1 2 3\n2 3 4\n#"

    var tmp = new Array();
    tmp = input.split('\n');
    var dubs = new Array();
    var j = 0;
    for (var i = 1; i < tmp.length - 1; i++) {
        dubs[j] = new Array();
        dubs[j] = tmp[i].split(' ');
        j++;
    }

    for (var i = 0; i < dubs.length; i++) {
        graph.nodes[dubs[i][0]].color = '#f00';
        graph.nodes[dubs[i][1]].color = '#f00';

        for (var j = 0; j < graph.edges.length; j++) {
            var wid = (dubs[i][0] < dubs[i][1]) ? dubs[i][0].toString() + "-" + dubs[i][1].toString() : dubs[i][1].toString() + "-" + dubs[i][0].toString();
            if (graph.edges[j].id === wid) {
                graph.edges[j].color = '#f00';
                j = graph.edges.length;
            }
        }
    }
    test_load();
}

function update_arc(input) {
    reset_colors();
    var lol = "4\n1 2 3\n2 3 4\n#"

    var tmp = new Array();
    tmp = input.split('\n');
    var dubs = new Array();
    var j = 0;
    for (var i = 1; i < tmp.length - 1; i++) {
        dubs[j] = new Array();
        dubs[j] = tmp[i].split(' ');
        j++;
    }

    for (var i = 0; i < dubs.length; i++) {
        for (var j = 0; j < graph.edges.length; j++) {
            var wid = (dubs[i][0] < dubs[i][1]) ? dubs[i][0].toString() + "-" + dubs[i][1].toString() : dubs[i][1].toString() + "-" + dubs[i][0].toString();
            if (graph.edges[j].id === wid) {
                graph.edges[j].color = '#00f';
                j = graph.edges.length;
            }
        }
    }

    for (var i = 0; i < parseInt(tmp[0]); i++) {
        graph.nodes[i].color = '#00f';
    }

    test_load();
}
