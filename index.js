const express = require("express");
const http = require("http");
const path = require("path")
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//socket
io.on("connection", (socket)=> {
    console.log("User Connected");
    socket.broadcast.emit("user-connected", "A new user has joined the chat!");

    socket.on("user-message", (msg) => {
        io.emit("user-message", msg);
    });

    socket.on("disconnect", ()=> {
        console.log("User Disconnected");
        socket.broadcast.emit("user-disconnected", "User left the chat :(")
    })
});


app.use(express.static(path.resolve("./public")));

app.get("/", (req,res) => {
    return res.sendFile("/public/index.html")
})

server.listen(3000, ()=> {
    console.log(`Server is up and running at PORT: 3000`);
})