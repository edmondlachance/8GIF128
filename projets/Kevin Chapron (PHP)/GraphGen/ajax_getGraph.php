<?php
	require_once('Graph.php');
	$nbSommet = $_REQUEST['nbSommet'];
	$densite  = $_REQUEST['densite'];
	
	$graph = new Graph($nbSommet, $densite);
	echo $graph->getJSON();
	
?>