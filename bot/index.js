require("dotenv").config();
// const ngrok = require("./get_public_url");
const localtunnel = require("localtunnel");
const bot = require("./ViberBot/botConfig");
const express = require("express");
const app = express();
const routes = require("./Routes/routes");
const io = require("socket.io-client");
const socket = io("http://localhost:3001");
const TextMessage = require("viber-bot").Message.Text;

const port = 5005;
app.use(bot.middleware());

const tunnel = localtunnel(
  port,
  { subdomain: "my-subdomain" },
  (err, tunnel) => {
    if (err) {
      console.log("Can not connect to localtunnel server. Is it running?");
      console.error(err);
      process.exit(1);
    }

    // the assigned public url for your tunnel
    // i.e. https://my-subdomain.loca.lt
    const publicUrl = tunnel.url;
    app.listen(port, () => {
      console.log(`Your bot is available at: ${publicUrl}`);
      bot.setWebhook(publicUrl);
    });
  }
);
tunnel.on("close", function () {
  // tunnels are closed
});
app.use(express.json());
app.use("/data", routes);

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
