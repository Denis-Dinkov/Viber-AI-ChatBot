require("dotenv").config();
const ngrok = require("./get_public_url");
const bot = require("./ViberBot/botConfig");

if (process.env.NOW_URL || process.env.HEROKU_URL) {
  const http = require("http");
  const port = process.env.PORT || 5000;

  http
    .createServer(bot.middleware())
    .listen(port, () =>
      bot.setWebhook(process.env.NOW_URL || process.env.HEROKU_URL)
    );
} else {
  return ngrok
    .getPublicUrl()
    .then((publicUrl) => {
      const http = require("http");
      const port = process.env.PORT || 5000;

      console.log("publicUrl => ", publicUrl);

      http
        .createServer(bot.middleware())
        .listen(port, () => bot.setWebhook(publicUrl));
    })
    .catch((error) => {
      console.log("Can not connect to ngrok server. Is it running?");
      console.error(error);
      process.exit(1);
    });
}
