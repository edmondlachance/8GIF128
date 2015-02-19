A propos de cet exemple
=========================
sb prend une chaine en JSON comme celle-ci :

```javascript
{
    "nodes": [
        "Amphitryon",
        "Alcmene",
        "Iphicles",
        "Heracles"
    ],
    "edges": [
        [
            "Amphitryon",
            "Alcmene"
        ],
        [
            "Alcmene",
            "Amphitryon"
        ],
        [
            "Amphitryon",
            "Iphicles"
        ],
        [
            "Amphitryon",
            "Heracles"
        ]
    ]
}
```

et en fait une chaine valide pour le code source C/C++, en remplacant les "" par des \n et en ayant chaque ligne entre des "".

Du côté client, on crée le websocket entre le worker C++ avec un bouton. On écrit le JSON dans le textarea et on appuie sur le bouton envoyer. On peut répèter ce processus autant de fois qu'on le veut. Le processus se réveille pour travailler car STDIN contient des choses, il travaille, il écrit sur la sortie standard et ensuite il retourne dormir. Lorsque le processus dort, il utilise 0 % du processeur. C'est l'OS qui le réveille. C'est un avancement sur CGI car avec ce système on peut avoir plusieurs n requêtes clients qui donnent m requêtes serveurs alors qu'en CGI on avait 1 requête client qui donnait 1 requête serveur.

Si vous lisez le code source du Javascript, vous verrez comment utiliser une classe de base avec les mots clés this et new. La gestion d'évènements est faite du côté HTML avec l'attribut onclick.

(info supplémentaire sur cette application, pas matière à examen)
-------------------------
L'application roule indéfiniment, bloquant chaque fois que son travail est terminé.
Ce comportement peut être utilisé pour avoir des automates réagissant parfaitement a des commandes venant de stdin et qui retournent dormir ensuite, prenant 0 % de processus et gardant seulement leur mémoire.
Il y a deux façons de fermer un  processus qui lit STDIN continuellement et qui bloque. La première façon est de fermer le socket depuis le browser. L'application websocketd ferme le stream a ce moment la, et le worker se ferme ensuite.
La deuxième façon est d'envoyer une valeur sentinelle (sentinel value) au programme, la détecter et terminer le programme. Websocketd détecte que le programme se ferme et ferme le websocket a son tour.

P.S
Pour déboguer un worker en C++, mettre _asm int 3 dans le code source, compiler l'exécutable en mode DEBUG et lancer le worker. Attachez le débogueur de votre choix (Visual Studio) et déboguez.

