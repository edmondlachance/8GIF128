var express = require('express')
var app = express()

app.get('/', function (req, res) {
    res.send('Hello World!')
})


app.get('/edmond', function( req, res) {
    res.send('Edmond');
})

//ROUTES SUPPLÉMENTAIRES
//REST SERVICES

// accept POST request on the homepage
app.post('/', function (req, res) {
    res.send('Got a POST request');
})

// accept PUT request at /user
app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user');
})

// accept DELETE request at /user
app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user');
})


var server = app.listen(80, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

})