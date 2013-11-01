var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var server = app.listen(port);

var ss = require('../index').listen(server, {
  authorize: true
});

ss.on('request', function (req) {
  var connection = req.accept(null, req.origin);
});

ss.on('connect', function (socket) {
  console.log('connected');
  
  var roomNo = Math.floor(Math.random(10) * 10);

  var time = Math.floor(Math.random() * 2000) + 1000;
  socket.join('room' + roomNo);

  setInterval(function () {
    ss.in('room' + roomNo).emit('hello', 'room' + roomNo);
  }, time); 
});

ss.on('close', function (socket) {
  console.log('closing...');
});

function connect(req) {

}