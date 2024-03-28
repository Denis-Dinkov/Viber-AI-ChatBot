require("dotenv").config();
const localtunnel = require("localtunnel");
const express = require("express");
const bot = require("./ViberBot/botConfig");
const app = express();
const io = require("socket.io-client");
const TextMessage = require("viber-bot").Message.Text;
const port = process.env.PORT;
const socket = io(process.env.SOCKET_IO);

app.use(bot.middleware());
app.use(express.json());

const tunnel = localtunnel(
  port,
  { subdomain: "my-subdomain" },
  (err, tunnel) => {
    if (err) {
      console.log("Can not connect to localtunnel server. Is it running?");
      console.error(err);
      process.exit(1);
    }

    const publicUrl = tunnel.url;
    console.log(`Your public URL is: ${publicUrl}`);
  }
);

tunnel.on("close", function () {});

socket.on("connect", () => {
  console.log("Connected to socket.io server");

  socket.on("hui-message", (data) => {
    bot.sendMessage(
      { id: "poxPTw8qu2TPGXlbK8aFUw==" },
      new TextMessage(data.text)
    );
  });
});

socket.on("connect_error", (error) => {
  console.log("Can not connect to socket.io server. Is it running?");
  console.log("Connect error: ", error);
});
