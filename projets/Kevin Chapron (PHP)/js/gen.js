($(function(){
	$('#densite').on("change mousemove keypress",function(){
		var value = $(this).val();
		$(this).next().html(value+" %");
	});

	$('#submitGen').click(function(){
		var ver = $('#nbSommet');
		$('#nbSommet').parent().removeClass('has-error');
		$('#rightPart').removeClass('overlay_active');
		if(isNaN(parseInt(ver.val())) || ver.val()<0)
		{
			$('#nbSommet').parent().addClass('has-error');
			$('#rightPart').addClass('overlay_active');
			$('#rightPart .overlay').html('Attention, le nombre de sommets est incorrect !');
			return false;
		}
		initCytoscape($('#nbSommet').val(),$('#densite').val(),$('#fancy_toggle_codepen input').is(':checked'));
	});
	
	$('#densite').val(50);
	$('#densite').next().html('50 %');
	console.log("gen.js --- loaded");	
}));