const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const port = 3000;

const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect('mongodb://localhost:27017/viberBot');

app.use(express.urlencoded({ extended: true }));

fs.readdirSync(path.join(__dirname, 'routes')).forEach(file => {
    const route = require(`./routes/${file}`);
    const routePath = `/${path.parse(file).name}`;
    app.use(routePath, route);
});

app.listen(port, () => {
    console.log(`REST API server listening at http://localhost:${port}`);
    server.listen(port + 1, () => {
        console.log(`Socket io server listening at http://localhost:${port + 1}`);
    });
});

io.on('connection', socket => {
    console.log(`${socket.handshake.address} -> Client connected (${socket.id})`);

    socket.on('message', data => {
        console.log('Message received:', data);
    });

    socket.on('unsubscribe', () => {
        console.log('Client unsubscribed');
    });

    socket.on('subscribe', () => {
        console.log('Client subscribed');
    });

    socket.on('disconnect', () => {

    });
});