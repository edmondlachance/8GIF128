($(function(){
	var nbSommet;
	var dijkstra;
	var cptHighLight;
	var TEMPS_APPARITION_EFFECT = 500;
	
	$('#submitGen').click(function(){
		nbSommet = $('#nbSommet').val();
		if(nbSommet > 2) 
		{
			$('#generation input[type="range"]').attr('max',nbSommet-1);
			init();
		}
	});
	
	function init()
	{
		$('#generation').css('display','block');
		$('#generation input[type="range"]').off();
		$('#launchEvent').off();
		
		$('#generation input[type="range"]').on("change mousemove keypress",barChange);
		$('#generation input[type="range"]').each(barChange);
		$('#launchEvent').click(initPath); 
	}
	
	function barChange(obj)
	{
		var value = parseInt($(this).val());
		$(this).next().html((value+1)+"/"+nbSommet);
	}
	
	function initPath()
	{
		var som1 = "#"+(parseInt($('#gen1').val())+1);
		var som2 = "#"+(parseInt($('#gen2').val())+1);
		
		dijkstra = cy.elements().dijkstra(som1, function(edge){return this.data('weight');});
		dijkstra = dijkstra.pathTo(cy.$(som2));
		
		cy.elements().removeClass('highlighted');
		
		cptHighLight = 0;
		highLightNextEle();
	}
	
	function highLightNextEle()
	{
		dijkstra[cptHighLight].addClass('highlighted');
		if( cptHighLight < dijkstra.length-1 ){
			cptHighLight++;
			setTimeout(highLightNextEle, TEMPS_APPARITION_EFFECT);
		}
	}
}));