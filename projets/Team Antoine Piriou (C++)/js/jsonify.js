
var lol = "4\n0 1 3\n0 2 4\n1 3 2\n#";

var graph;

load_graph();

function load_graph()
{

	var tmp = new Array();
	tmp = lol.split('\n');

	var indies = new Array();
	var j = 0;
	for (var i = 1; i < tmp.length - 1; i++)
	{
		indies[j] = new Array();
		indies[j] = tmp[i].split(' ');
		j++;
	}

	var nodes = new Array();
	var edges = new Array();

	for (var i = 0; i < parseInt(tmp[0]); i++)
	{
		var node = new Object();
		node.id = i.toString();
		node.label = "lol";
		node.x = i;
		node.y = 0;
		node.size = 1;
		node.color = '#777';
		nodes.push(node);
	}

	for (var i = 0; i < indies.length; i++)
	{
		var edge = new Object();
		edge.id = indies[i][0].toString() + indies[i][1].toString();
		edge.source = indies[i][0].toString();
		edge.target = indies[i][1].toString();
		edge.color = '#777';
		edges.push(edge);
	}

	var graph = new Object();
	graph.nodes = nodes;
	graph.edges = edges;
console.log(indies);
	var json = JSON.stringify(graph, null, 2);
console.log(json);
var fs = require('fs');
fs.writeFileSync("..\\json\\graph.json", json);

}

function update_path()
{
	var lol = "1 2 3";

	var nodes = new Array();
	nodes = lol.split(' ');

	for (var i = 0; i < nodes.length - 1; i++)
	{
		graph.nodes[i].color = '#00f'
		for (var j = 0; j < graph.edges.length; j++)
		{
			if (graph.edges[j].id === graph.nodes[i].toString() + graph.nodes[i+1].toString())
			{
				graph.edges[j].color = '#00f';
				j = graph.edges.length;
			}
		}
	}

	graph.nodes[nodes.length - 1].color = '#00f';
	if (lol.legth >= 2)
	{
		for (var j = 0; j < graph.edges.length; j++)
		{
			if (graph.edges[j].id === graph.nodes[nodes.length-2].toString() + graph.nodes[length-1])
			{
				graph.edges[j].color = '#00f';
				j = graph.edges.length;
			}
		}
	}
}