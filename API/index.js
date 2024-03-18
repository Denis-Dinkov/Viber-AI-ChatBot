const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const UserService = require("./services/userService");

const app = express();
const port = 3000;

const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect("mongodb://localhost:27017/viberBot");

app.use(cors()); // Use cors middleware
app.use(express.urlencoded({ extended: true }));

fs.readdirSync(path.join(__dirname, "routes")).forEach((file) => {
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

io.on("connection", (socket) => {
  console.log(`${socket.handshake.address} -> Client connected (${socket.id})`);

  socket.on("message", async (data) => {
    if (data.text === "subscribe") {
      UserService.setSubscribeStatus(data.uid, true);
    } else if (data.text === "unsubscribe") {
      UserService.setSubscribeStatus(data.uid, false);
    }

    UserService.addUser(data.uid, data.name, data.avatar);
  });

  socket.on("unsubscribe", async (userId) => {
    UserService.changeUserStatus(userId, false);
  });

  socket.on("subscribe", async (userId) => {
    UserService.changeUserStatus(userId, true);
  });
});
