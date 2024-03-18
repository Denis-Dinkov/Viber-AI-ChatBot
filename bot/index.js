require("dotenv").config();
// const ngrok = require("./get_public_url");
const localtunnel = require("localtunnel");
const bot = require("./ViberBot/botConfig");
const express = require("express");
const app = express();
const routes = require("./Routes/routes");
/*const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected to database"));
*/

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
