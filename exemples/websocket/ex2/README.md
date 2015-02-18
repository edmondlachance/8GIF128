A propos de cet exemple
=========================

Ce qui se produit : 

Le browser envoie 1 ligne avec 2 valeurs en string au websocket.
Le websocket crée un processus, lui envoie les données dans son STDIN.
Le processus lit STDIN avec scanf, recupère les valeurs, et les réenvoie au serveur avec PRINTF.
Le websocket capte stout, et envoie un message au browser.

Pour tester l'exemple, utiliser le fichier batch file, et le débogueur de Firefox ou Chrome.
