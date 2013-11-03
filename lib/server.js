var WebSocketServer = require('websocket').server;

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var Manager = require('./manager');

exports.listen = function (server, options) {
  return new Server(server, options);
}

function Server(server, options) {
  var self = this;

  this.options = { 
    httpServer: server,
    autoAcceptConnections: true
  };

  extend(this.options, options);

  if (this.options.authorize) {
    this.options.autoAcceptConnections = false;
  }
  
  this.wss = new WebSocketServer(this.options);
  this.manager = new Manager();

  this.wss.on('connect', function (connection) {
    connection.setManager(self.manager);
    self.emit('connect', connection);
  });

  this.wss.on('requestAccepted', function (connection) {
    connection.setManager(self.manager);
    self.emit('requestAccepted', connection);
  });

  this.wss.on('close', function (client) {
    client.leaveAll();
    self.emit('close', client);
  });

  proxy.call(this, this.wss, 'error');
  proxy.call(this, this.wss, 'headers');
  proxy.call(this, this.wss, 'listening');
  proxy.call(this, this.wss, 'message');
  proxy.call(this, this.wss, 'request');
  proxy.call(this, this.wss, 'requestRejected');
}

util.inherits(Server, EventEmitter);

Server.prototype.in = function (name) {
  return this.manager.in(name);
}

// helpers

function proxy(obj, event) {
  var self = this;
  obj.on(event, function (client) {
    self.emit(event, client);
  });
}

function extend(dest, src) {
  for (var i in src) {
    if (src.hasOwnProperty(i)) {
      dest[i] = src[i];
    }
  }
}