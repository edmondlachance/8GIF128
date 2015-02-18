Express
===========

Module pour faire des serveurs avec NODEJS
http://expressjs.com/

Permet d'avoir des routes assez aisées

```javascript
// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
  res.send('Hello World!');
})

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
```

Je conseille Jetbrains's Webstorm comme IDE. Permet de faire du débogage et d'envoyer des requêtes HTTP test.
https://www.jetbrains.com/webstorm/



