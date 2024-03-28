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
    app.listen(port, () => {
      console.log(`Your bot is available at: ${publicUrl}`);
      bot.setWebhook(publicUrl);
    });
  }
);

tunnel.on("close", function () {});

socket.on("connect", () => {
  console.log("Connected to socket.io server");

  socket.on("admin-message", (data) => {
    console.log(data);
    bot.sendMessage({ id: data.userId }, new TextMessage(data.text));
  });
});

socket.on("connect_error", (error) => {
  console.log("Can not connect to socket.io server. Is it running?");
  console.log("Connect error: ", error);
});
