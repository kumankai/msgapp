require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const { createServer } = require("http");
const app = express();
const port = process.env.PORT;
const httpServer = createServer(app);

///////// MONGODB //////////

const uri = process.env.URI;

const mdbconnect = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
    }
}

///////// POSTGRES //////////



////////////////////////////

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5010",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
// Socket action listeners go here

    socket.on("join", (data) => {
        socket.join(data);
    })

    socket.on("message", (data) => {
        socket.to.emit("response", data);
    })
});

////////////////////////////

try {
    //mdbconnect();
    //pgconnect();
    httpServer.listen(port, () => {
        console.log(`Message API listening on port ${port}`)
    });
} catch (err) {
    console.error(err);
}