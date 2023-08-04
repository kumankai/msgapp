// ---------------------------
// Module: Message controllers
// ---------------------------
// Contains functions related to message handling

import io from 'socker.io-client';

const joinRoom = (room) => {
    if (room != "") {
        socket.emit("join", room);
    };
};

const sendMessage = (message, room, userid) => {
    Socket.emit("message", { message, room, userid });
};

export default { joinRoom, sendMessage, };