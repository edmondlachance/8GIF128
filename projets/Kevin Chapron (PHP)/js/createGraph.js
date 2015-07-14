var cy;
function initCytoscape(nbSommet, densite, affWeight)
{
	$('#submitGen + button').css('display','inline');
	
	var result;
	$.ajax({
		url:'GraphGen/ajax_getGraph.php',
		data:{'nbSommet':nbSommet,'densite':densite},
		method:'POST',
		async:false,
		success: function(html)
		{
			console.debug(html);
			result = $.parseJSON(html);
		}
	});
	// On formate les données de result pour donner deux tableaux : nodes & edges
	var _nodes = [];
	var _edges = [];
	
	for(i=0;i<result["listSommet"].length;i++)
		_nodes[_nodes.length] = { "data": {"id" : result["listSommet"][i]}};
		
	for(i=0;i<result["listArc"].length;i++)
		_edges[_edges.length] = { "data" : 
			{ 	
				"id": result["listArc"][i]["sommet1"]+""+result["listArc"][i]["sommet2"],
				"weight":result["listArc"][i]["poids"],
				"source":result["listArc"][i]["sommet1"],
				"target":result["listArc"][i]["sommet2"]
			} 
		};
		
	// Selon l'affichage ou non on change l'affichage du content des edge
	var objCss = {
					'width': 4,
					'line-color': '#aaa',
					'target-arrow-color': '#aaa',
					'content': 'data(weight)',
					'color': 'black'
				};
	if(!affWeight) objCss.content='';
	// On crée le graph
	cy = cytoscape({
		container: document.getElementById('cy'),
		style: 	cytoscape.stylesheet()
				.selector('node')
				.css({
					'content': 'data(id)',
					'color':'#00b',
					'font-weight':'bold'
				})
				.selector('edge')
				.css(objCss)
				.selector('.highlighted')
				.css({
					'background-color': '#f00',
					'line-color': '#f00',
					'target-arrow-color': '#f00',
					'transition-property': 'background-color, line-color, target-arrow-color',
					'transition-duration': '0.5s'
				})
				.selector('edge.highlighted')
				.css({
					'text-outline-color':'red',
					'text-outline-width':2,
					'color':'white'
				})
				.selector('.kruskal')
				.css({
					'background-color': 'red',
					'line-color': 'red',
					'target-arrow-color': 'red'
				})
				.selector('edge.kruskal')
				.css({
					'text-outline-color':'red',
					'text-outline-width':2,
					'color':'white'
				}),
		elements: {
			nodes: _nodes, 
			edges: _edges,
		},
		layout: {
			name: 'circle',
			directed: false,
			padding: 10
		}
	});
	
	cytoscape('collection', 'myKruskal', function( ){
		var lEdge = this.edges();
		var tabEdge = new Array();
		lEdge.each(function(index, value){
			var indexToAdd;
			for(indexToAdd = 0 ; tabEdge.length > indexToAdd && tabEdge[indexToAdd].data('weight') < value.data('weight') ; indexToAdd++);
			tabEdge.splice(indexToAdd,0,value);
		});
		
		var tabNodes = new Array();
		this.nodes().each(function(val, index){
			var t = new Array();
			t.push(index);
			tabNodes.push(t);
		});
		var kruskal  = new Array();
		var stop     = false;
		
		tabEdge.forEach(function(val,i){
			if(stop) return;
			var s1 = val.source();
			var s2 = val.target();
			
			var i1 = 0;
			var i2 = 0;
			
			tabNodes.forEach(function(value, index){
				if(value.indexOf(s1)!=-1) i1 = index;
				if(value.indexOf(s2)!=-1) i2 = index;
			});
			if(i1!=i2) 
			{
				tabNodes[i2].forEach(function(val,ind){
					tabNodes[i1].push(val);
				});
				tabNodes.splice(i2,1);
				kruskal.push(val);
			}
			
			if(tabNodes.length==1)	stop = true;
		});
		
		this.nodes().addClass('kruskal');
		kruskal.forEach(function(v){
			v.addClass('kruskal');
		});
		
		return this; // Garder le fait d'être chainable
	});

}