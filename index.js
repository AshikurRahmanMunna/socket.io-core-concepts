const { time } = require('console');
const { Socket } = require('dgram');
const express = require('express');
const http = require('http');
const app = express();
const port = process.env.port || 3000;

const expressServer = http.createServer(app)

const { Server } = require('socket.io');
const io = new Server(expressServer);


io.on('connection', (socket) => {
    socket.join('kitchen-room');
    const sizeOfKitchen = io.sockets.adapter.rooms.get("kitchen-room").size;
    io.sockets.in('kitchen-room').emit('cooking', "fried rice cooking = " + sizeOfKitchen);
    io.sockets.in('kitchen-room').emit('boiling', "boiling water")
    socket.join('bed-room');
    io.sockets.in('bed-room').emit('sleep', "i am taking rest")
    io.sockets.in('bed-room').emit('rest', "i am taking rest")
    // socket.join('dining-room');
})


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

expressServer.listen(port, () => {
    console.log(`Socket Server is running on port ${port}`);
});