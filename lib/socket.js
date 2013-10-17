var WebSocket = require('ws');

WebSocket.prototype.setManager = function (manager) {
  this.manager = manager;
}

WebSocket.prototype.join = function (name) {
  this.rooms = (this.rooms || []);
  
  if (this.rooms.indexOf(name) < 0) {
  	this.manager.join(name, this);
 	 	this.rooms.push(name);
	}
}

WebSocket.prototype.leave = function (name) {
  this.manager.leave(name, this);
}

WebSocket.prototype.leaveAll = function (client) {
  if (!this.rooms) return;

  for (var i = 0, l = this.rooms.length; i < l; i++) {
    this.manager.leave(this.rooms[i], this);
  }
}