require("dotenv").config();
const ngrok = require("./get_public_url");
const bot = require("./ViberBot/botConfig");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./Routes/routes");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected to database"));

if (process.env.NOW_URL || process.env.HEROKU_URL) {
  const port = process.env.PORT || 5000;

  app.use(bot.middleware());
  app.listen(port, () =>
    bot.setWebhook(process.env.NOW_URL || process.env.HEROKU_URL)
  );
} else {
  return ngrok
    .getPublicUrl()
    .then((publicUrl) => {
      const port = process.env.PORT || 5000;
      app.use(bot.middleware());
      app.listen(port, () => bot.setWebhook(publicUrl));
    })
    .catch((error) => {
      console.log("Can not connect to ngrok server. Is it running?");
      console.error(error);
      process.exit(1);
    });
}

app.use(express.json());
app.use("/data", routes);
