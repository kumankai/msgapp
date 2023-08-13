// ---------------------------
// Module: Message controllers
// ---------------------------
// Contains functions related to message handling

const io = require('socket.io-client');

const socket = io.connect('http://localhost:5000');

const joinRoom = (room) => {
    if (room != "") {
        socket.emit("join", room);
    };
};

const sendMessage = (username, timestamp, message, room) => {
    socket.emit("message", { username, timestamp, message, room});
};

module.exports = { joinRoom, sendMessage };