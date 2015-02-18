A propos de cet exemple
=========================
Pour tester cet exemple vous devez avoir :
- Google Chrome ou Firefox (ici j'utilise Chrome)
- PHP dans la path. PHP est utilisé pour avoir un serveur HTTP qui sert les fichiers du dossier. Un autre serveur peut etre utilisé bien sur!
- l'executable websocketd dans la path ou dans le dossier. 
- Cliquez sur start.cmd sur Windows
- Sur Linux c'est la même chose, il suffit de retaper chaque commande dans une console




Websockets
===========

Les websockets sont une nouvelle technologie web pour le browser qui permet a Javascript de faire appel a des processus travailleurs en dual duplex, ce qui rend la technologie différente de la requête HTTP asynchrone. Il n'est plus question de HTTP ici, c'est un travail beaucoup plus brut.
Pour plus de détails, lire 
http://en.wikipedia.org/wiki/WebSocket

Voici un schéma illustrant la différence entre technologies

![Alt text](http://orm-chimera-prod.s3.amazonaws.com/1230000000545/images/hpbn_1702.png) 

Le projet Websocketd (Web Socket Daemon) permet de convertir des fichiers exécutables qui lisent stdin et écrivent sur stdout en mini-serveurs. Chaque fois qu'une requête est lancée, le daemon lance le processus
http://websocketd.com/

Exemple simple de processus travailleur écrit en C :

```c
    #include <stdio.h>
    #include <windows.h>

    int main() {
    int i;

    // Disable output buffering.
    setbuf(stdout, NULL);

    for (i = 1; i <= 10; i++) {
        printf("%d\n", i);
        //usleep(500000);
		Sleep(500);
    }

    return 0;
    }
```

Exemple d'application avec websockets plus riche :
http://socket.io/
https://github.com/rauchg/chat-example

```javascript
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});
io.on('connection', function(socket){
socket.on('chat message', function(msg){
io.emit('chat message', msg);
});
});
http.listen(3000, function(){
console.log('listening on *:3000');
});
```




