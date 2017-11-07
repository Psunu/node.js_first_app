/*var express = require('express');

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function() {
  console.log('Server On!');
});*/

/*
var http = require("http");

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end("Hello World\n");
}).listen(8000);

console.log("Server running at http://localhost:8000");
*/

var events = require("events");
var eventEmitter = new events.EventEmitter();

eventEmitter.on("connection", function() {
  console.log("Connection Successful");
  eventEmitter.emit("data_recevied");
});

eventEmitter.on("data_recevied", function() {
  console.log("Data Received");
});

eventEmitter.emit("connection");
console.log("Program has ended");
