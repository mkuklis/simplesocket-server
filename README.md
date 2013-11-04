## simplesocket-server


## Description

Adds Room / Namespace layer on top of [WebSocket-Node](https://github.com/Worlize/WebSocket-Node) in node.js.
This library was created because I like [socket.io](http://socket.io) API but I ran into multiple issues when using it in production environment.

**simplesocket-server** together with [simplesocket-client](https://github.com/mkuklis/simplesocket-client) can interact with each other in a similar fashion to socket.io client and server.


## Installation

```bash 
npm install simplesocket-server
```

## Usage

```js
// supports any http server including express
var server = require("simplesocket-server").listen(httpServer);

server.on('connect', function (socket) {
  // trigger 'news' event 
  socket.trigger('news', { hello: 'world' });
  
  socket.on('eventName', function (data) {
    console.log(data);
  });
  
  // join specific room
  socket.join('roomName');
  
  // send data to all clients in given room
  server.in('roomName').trigger('eventName', { 'key': 'value' });
});

```

##License:
<pre>
The MIT License
</pre>