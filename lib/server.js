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

    connection.on('message', function (message) {
      var data = parse(message);
      if (!data) return;
      connection.emit.apply(connection, [data.name].concat(data.args));
    });
  });

  this.wss.on('close', function (connection) {
    connection.leaveAll();
    self.emit('close', connection);
  });

  proxy.call(this, this.wss, 'request');
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

function parse(data) {
  if (!data || !data.utf8Data) return;
  return JSON.parse(data.utf8Data);
}