const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
// setting the app variable to expresss which is a method

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

var app = express();
// creatting a server using http server
var server = http.createServer(app);
// getting back web socket server.
var io = socketIO(server);

// taking in middleware
app.use(express.static(publicPath));

// lets you listen to a new connection
io.on("connection", function(socket) {
  console.log("New user connected");

  // This is the message that will be sent by the admin
  socket.emit("newMessage", {
    from: "Admin",
    text: "Welcome to the Chat App",
    createdAt: new Date().getTime()
  });

  // Broadcasting Events: sends event to everyone but this socket
  socket.broadcast.emit("newMessage", {
    from: "Admin",
    text: "New user joined",
    createdAt: new Date().getTime()
  });

  // going from client to server
  socket.on("createMessage", newMessage => {
    console.log("New message to server ", newMessage);
    // emits an event to every connection
    // this is how everyone can see the chat.
    io.emit("newMessage", {
      from: newMessage.from,
      text: newMessage.text,
      // specify time so it stops time spoofing from client
      createdAt: new Date().getTime()
    });
  });

  // will show when you disconnect from the server
  socket.on("disconnect", function(socket) {
    console.log("Disconnected from server");
  });
});

// will show in the terminal
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
