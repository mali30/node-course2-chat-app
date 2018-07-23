const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var app = express();

// creatting a server using http server
var server = http.createServer(app);

// getting back web socket server. 
var io = socketIO(server);

// lets you listen to a new connection
io.on('connection' , (socket) =>{
    console.log('New user connected');

    socket.on('disconnect' , (socket) =>{
        console.log('Disconnected from server')
    });
});




const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


// taking in middleware
app.use(express.static(publicPath));



server.listen(port, () => {
    console.log(`Server is up on ${port}`);

});
