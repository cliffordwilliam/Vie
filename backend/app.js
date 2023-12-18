const express = require("express");

// production? do not use .env
if (process.env.NODE_ENV !== "production") require("dotenv").config();

// home router
const homeRouter = require("./routers/homeRouter");

// need the handleError
const Middleware = require("./middleware");

// cors
const cors = require("cors");

// create app
const app = express();
app.use(cors());

// socket
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
io.on("connection", (socket) => {
  socket.on("join_room", (room) => {
    socket.join(room);
  });
  socket.on("send_message", (data) => {
    const { room, count } = data;
    socket.to(room).emit("receive_message", count);
  });
});

app.use(express.urlencoded({ extended: true })); // req.body
app.use(express.json()); // for reading jest req
app.use(homeRouter); // enter home router
app.use(Middleware.handleError); // dump all err here

// exports
module.exports = { app, server };
