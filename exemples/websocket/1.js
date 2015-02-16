var ws = new WebSocket('ws://localhost:8080/');

var body = document.body;

ws.onmessage = function(event) {
  console.log('Count is: ' + event.data);
  body.appendChild( document.createTextNode('Count is: '+event.data) );
};

