var WebSocket = require('ws');

for (var i = 0; i < 2000; i++) {

	var time = Math.floor(Math.random() * 2000) + 1000;

	(function (time) {
		setTimeout(function () {
			var socket = new WebSocket('http://127.0.0.1:5000');

			socket.onerror = function (err) {
				console.log(err);
			}
			socket.onmessage = function (socket) {
				console.log(socket.data);
			}
		}, time);

	})(time);
}