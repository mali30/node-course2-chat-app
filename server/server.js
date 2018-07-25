const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

// setting the app variable to expresss which is a method
var app = express();

// creatting a server using http server
var server = http.createServer(app);

// getting back web socket server. 
var io = socketIO(server);

// lets you listen to a new connection
io.on('connection' , function(socket) {
    console.log('New user connected');

    
    // emits event that will be show in browser
    socket.emit('newMessage',{
        from: 'MOEG',
        text: 'What it do flight crew',
        createdAt: 2
    });

    socket.emit('newMessage',{
        from: 'Ali',
        text: 'This is ali',
        createdAt: 2
    });


    // going from client to server
    socket.on('createMessage',(newMessage) =>{
        console.log("New message to server ", newMessage);
    })

    // will show when you disconnect from the server
    socket.on('disconnect' , function(socket){
        console.log('Disconnected from server')
    });
});

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


// taking in middleware
app.use(express.static(publicPath));



// will show in the terminal
server.listen(port, () => {
    console.log(`Server is up on ${port}`);

});
