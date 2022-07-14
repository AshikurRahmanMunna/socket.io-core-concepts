const { time } = require('console');
const { Socket } = require('dgram');
const express = require('express');
const http = require('http');
const app = express();
const port = process.env.port || 3000;

const expressServer = http.createServer(app)

const { Server } = require('socket.io');
const io = new Server(expressServer);


const buyNsp = io.of('/buy');
const sellNsp = io.of('/sell');

buyNsp.on('connection', socket => {
    buyNsp.emit("MyEvent", 'Hello buy');
})

sellNsp.on('connection', socket => {
    sellNsp.emit("MyEvent", 'Hello sell');
})


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

expressServer.listen(port, () => {
    console.log(`Socket Server is running on port ${port}`);
});