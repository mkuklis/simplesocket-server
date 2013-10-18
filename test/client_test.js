var WebSocketClient = require('websocket').client;

for (var i = 0; i < 2000; i++) {
  var time = Math.floor(Math.random() * 2000) + 1000;

  (function (time) {
    setTimeout(function () {
      var client = new WebSocketClient();

      client.on('connect', function (connection) {
        connection.on('message', function (message) {
          console.log(message.utf8Data);
        });
      });

      client.connect('http://127.0.0.1:5000');

    }, time);

  })(time);
}