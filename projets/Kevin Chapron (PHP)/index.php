<!DOCTYPE html>
<html>
	<head>
		<title>Conception et programmation web</title>
		<link rel="icon" type="image/png" href="img/favicon.png" />
		<link rel="stylesheet" href="css/rangeInput.css">
		<!-- Librairies BOOTSTRAP + JQUERY -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<link rel="stylesheet" href="bootstrap/css/bootstrap.css">
		<link rel="stylesheet" href="bootstrap/css/bootstrap-theme.min.css">
		<script src="bootstrap/js/bootstrap.min.js"></script>
		<!-- Fin des Librairies BOOTSTRAP + JQUERY -->
		<?php 
			require_once('GraphGen/Graph.php');
			$js = array();
		
			if(isset($_GET['page']) && !empty($_GET['page'])) 	$page = $_GET['page'];
			else 												$page = 'gen';
			
			$js[] = "js/createGraph.js";
			$js[] = "js/gen.js";	
			$js[] = "cytoscape/build/cytoscape.js";	
			if($page=='alg_s' || $page=='alg_m') $js[] = "js/".$page.".js";

			foreach($js as $j)
				echo '<script src="'.$j.'"></script>';
		?>
	</head>
	<body>
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="?">
						<img alt="Brand" src="img/logo.jpg" />
					</a>
				</div>

				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li class="active">
							<a href="?page=gen">Générateur de Graphes <span class="sr-only">(Actuel)</span></a>
						</li>
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Algorithmes <span class="caret"></span></a>
							<ul class="dropdown-menu" role="menu">
								<li><a href="?page=alg_s">Single Source Shortest Path Problem</a></li>
								<li><a href="?page=alg_m">Minimum Spanning Tree Problem</a></li>
							</ul>
						</li>
					</ul>
					<ul class="nav navbar-nav navbar-right">
					<li><a href="?page=prop">A propos</a></li>
					</ul>
				</div><!-- /.navbar-collapse -->
			</div><!-- /.container-fluid -->
		</nav>
		
		<!-- Mise en place du contenu -->
		<?php
			switch($page)
			{
				case 'gen':		include("page/gen.php");	break;
				case 'alg_s':	include("page/alg_s.php");	break;
				case 'alg_m':	include("page/alg_m.php");	break;
				case 'prop':	include("page/prop.php");	break;
			}
		?>
	</body>
</html>