<div id="content">
	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">Générateur de Graphes - Single Source Shortest Path Problem</h3>
		</div>
		<div class="panel-body">
			<div class="partWidth">
				<div class="form-group">
					<label for="nbSommet">Nombre de Sommets</label>
					<input type="text" class="form-control" id="nbSommet" placeholder="Entrer le nombre de sommets du graphe">
				</div>
				
				<label for="densite">Densité du Graphe</label>
				<div class="input-group">
					<input id="densite" type="range" min=0 max=100 class="form-control" placeholder="Densité du graphe" aria-describedby="basic-addon2">
					<span class="input-group-addon" id="basic-addon2"></span>
				</div>
				
				<div id="fancy_toggle_codepen">
					<label  data-on="ON" data-off="OFF" class="toggleSwitch">  
						<span>Affichage des poids</span>
						<input type="checkbox" checked="checked"/>
						<span class="knob"></span>
					</label>
				</div>
				
				<input id="submitGen" class="btn btn-default" type="submit" value="Créer !">
				
				<div id="generation" class="form-group" style="margin-top:20px;display:none">
					<h3>Chemin à générer</h3>
					<label for="gen1">Sommet de départ</label>
					<div class="input-group">
						<input id="gen1" type="range" min=0 max=100 class="form-control" placeholder="Sommet de départ" aria-describedby="basic-addon2">
						<span class="input-group-addon" id="basic-addon2"></span>
					</div>
					<label for="gen2">Sommet d'arrivée</label>
					<div class="input-group">
						<input id="gen2" type="range" min=0 max=100 class="form-control" placeholder="Sommet d'arrivée" aria-describedby="basic-addon2">
						<span class="input-group-addon" id="basic-addon2"></span>
					</div>
					<br />
					<input id="launchEvent" class="btn btn-default" type="submit" value="Afficher le chemin">
				</div>
			</div>
			<div class="panel panel-default nextPartWidth floatLeft overlay_active" id="rightPart">
				<div class="overlay" id="errorMsg">Pour générer un graphe, veuiller remplir le formulaire.</div>
				<div class="panel-body" id="cy"></div>
			</div>
		</div>
	</div>
</div>