// creates connection to listen to data and send to server
// critical for communication
var socket = io();

// listening to new events
socket.on("connect", function() {
  console.log("Connected to server");
});

// listening to disconnect events
socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

// will display in browser
socket.on("newMessage", function(message) {
  console.log("New message", message);
});
