var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(80);
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/1.html');
});
io.on('connection', function(socket)
{
    var stack = 0;
    function x(n)
    {
        if (n == 0) return 0;
        socket.emit("algo", Math.floor(n/10));
        stack+= n % 10;
        return 2;
    }
    socket.on('algo', function(n) {
        console.log(n);
        var ret = x(n);
        if (ret == 0) {
            socket.emit("server_fini", stack);
        }
    });
    socket.on('browser_fini' , function(data) {
        socket.emit("server_fini", stack);
    });
});


