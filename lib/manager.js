var utils = require('./utils');

// connection manager
module.exports = Manager;

function Manager() {
  this.rooms = {};
}

Manager.prototype.join = function (name, client) {
  this.rooms[name] || (this.rooms[name] = []);
  this.rooms[name].push(client);

  return this;
}

Manager.prototype.leave = function (name, client) {

  if (!this.rooms[name]) return;

  var index = this.rooms[name].indexOf(client);
  
  if (index > -1) {
     this.rooms[name].splice(index, 1);
  }

  if (this.rooms[name].length == 0) {
    delete this.rooms[name];
  }

  return this;
}

Manager.prototype.in = function (name) {
  this.room = this.rooms[name];
  
  return this;
}

Manager.prototype.trigger = function (name, data, options) {
  if (!this.room || this.room.length == 0) return;
  
  var message = utils.createMessage(name, data);

  for (var i = 0, l = this.room.length; i < l; i++) {
    var client = this.room[i];
    client && client.sendUTF(message);
  }
}