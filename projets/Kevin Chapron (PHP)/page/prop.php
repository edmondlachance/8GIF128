<div id="content">
	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">8GIF128 - Conception et programmation de sites Web</h3>
		</div>
		<div class="panel-body">
			<p>Site conçu par CHAPRON Kévin pour le cours 8GIF128.</p>
			<p>Le design est organisé grâce à Bootstrap. (<a href="http://getbootstrap.com/" alt="Lien bootstrap">http://getbootstrap.com/</a>)</p>
			<p>L'affichage des graphes est géré grâce au plugin Cytoscape (<a href="http://js.cytoscape.org" alt="Lien Cytoscape">http://js.cytoscape.org</a>)</p>
			<p>Les trois services sont accessibles depuis les menus et/ou la page d'accueil, celle-ci étant le générateur de graphes. 
			Les deux algorithmes s'occupant d'afficher certaines informations d'un graphe sont disponibles sous le menu déroulant "Algorithmes".
			Les deux algorithmes étaient ceux préfaits par Cytoscape, mais dû à une demande intensive d'Edmond, j'ai recodé Kruskal par moi-même. (Minimum Spanning Tree Problem)</p>
			
			<p>Le générateur de graphe est ré-utilisé dans chaque algorithme. 
			Celui-ci demande une saisie de nombre de sommets, et de densité de graphe (via sélecteur Range), 
			et un booléen (input Radio) demandant si l'affichage des poids des arêtes doit se faire ou non.
			Il va créer des graphes en fonction de la densité tant que le graphe créé n'est pas connexe.</p>
			
			<p>L'algorithme "Single Source Shortest Problem" est résolu par Dijkstra. Il crée le plus court chemin entre chaque Noeud.
			Il demande par défaut deux sommets à définir (Départ / Arrivée) déterminé par un deux input Range. 
			Au clic sur le bouton "Afficher le chemin", le graphe va réaliser le chemin au fur et à mesure qu'il doit se faire.</p>
			
			<p>L'algorithme "Minimum Spanning Tree Problem" est résolu par Kruskal. 
			Il trie les arêtes par poids croissant, et relie les noeuds tant que tout les noeuds n'ont pas été reliés.
			Cet algorithme ne demande par conséquent aucune information supplémentaire, les seuls informations nécessaires étant le graphe lui-même. 
			Au clic sur le bouton "Surligner l'arbre couvrant minimum", le graphe va surligner en Rouge l'arbre couvrant minimum.</p>
			
			<p><strong>Enjoy it !</strong></p>
		</div>
	</div>
</div>