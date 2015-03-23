A propos de cet exemple
=========================

Le worker est écrit en 85 lignes de C++.
Le worker lit un fichier de graphe ligne par ligne depuis son entrée standard (stdin). Il arrête de lire des lignes quand il rencontre le symbole # sur une ligne.
Après la lecture du graphe, il parcourt ce dernier avec l'algorithme DFS tout en imprimant le parcours qu'il prend. Il imprime son parcours dans sa sortie standard (stdout). Stdout est intercepté par websocketd qui fait des messages websockets avec. Un message websocket est envoyé pour chaque \n rencontré dans la chaine de caractère imprimée par le worker.

**Fonctions et algos utilisés dans le programme :**

http://en.wikipedia.org/wiki/Depth-first_search

http://www.cplusplus.com/reference/cstdio/scanf/

http://www.cplusplus.com/reference/cstdio/gets/?kw=gets

http://www.cplusplus.com/reference/vector/vector/resize/

Exemple :
==========

![exemple](http://i.imgur.com/Lz6C5Az.png)
