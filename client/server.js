var express = require("express");
var http = require("http");
var socketio = require("socket.io");

var app = express();
var server = http.Server(app);
var websocket = socketio(server);
server.listen(3000, () => console.log("listening on *:3000"));

app.post("/init/1", (req, res) => {
  res.json({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  });
});

app.post("/test", (req, res) => {
  res.json("workd");
});

// The event will be called when a client is connected.
websocket.on("connection", socket => {
  console.log("A client just joined on", socket.id);
  socket.on("findRoom", msg => {
    console.log(msg);
    socket.emit("msg", "from server");
  });
});
