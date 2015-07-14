($(function(){
	$('#submitGen').click(function(){
		nbSommet = $('#nbSommet').val();
		if(nbSommet > 2) 
		{
			$('#generation').css('display','block');
		}
	});
	
	$('#launchEvent').click(function(){
		cy.elements().myKruskal();
	});
}));