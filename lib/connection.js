var WebSocketConnection = require('websocket').connection;

WebSocketConnection.prototype.setManager = function (manager) {
  this.manager = manager;
}

WebSocketConnection.prototype.join = function (name) {
  this.rooms = (this.rooms || []);

  if (this.rooms.indexOf(name) < 0) {
  	this.manager.join(name, this);
 	 	this.rooms.push(name);
	}
}

WebSocketConnection.prototype.leave = function (name) {
  this.manager.leave(name, this);
}

WebSocketConnection.prototype.leaveAll = function (client) {
  if (!this.rooms) return;

  for (var i = 0, l = this.rooms.length; i < l; i++) {
    this.manager.leave(this.rooms[i], this);
  }

  this.rooms = [];
}