const http = require("http");
const socket = require("socket.io");
const { Server } = require("socket.io");
const express = require("express");
const app = express();


const server = http.createServer(app);

const io = new Server(server , {
    cors:{
        origin: (process.env.CLIENT_URL || "http://localhost:3000"),
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type,Authorization',
        AccessControlAllowCredentials: true,
        credentials: true,
    }

});


io.on("connection", (socket)=>{
    const user = socket.handshake.query.user;

    socket.emit("userConnected", user);
    
    socket.on("disconnect", ()=>{
        // saving data while disconnecting...
    })
})

module.exports = {io, app, server};