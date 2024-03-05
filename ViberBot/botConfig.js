const ViberBot = require("viber-bot").Bot;
const BotEvents = require("viber-bot").Events;
const TextMessage = require("viber-bot").Message.Text;
const PictureMessage = require("viber-bot").Message.Picture;
const botResponse = require("./botResponse.js");

function say(response, message) {
  response.send(new TextMessage(message));
}

const bot = new ViberBot({
  authToken: process.env.ACCESS_TOKEN,
  name: "Dendo",
  avatar: "./profileimg.jpg",
});

bot.onSubscribe((response) => {
  say(
    response,
    `Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me if a web site is down for everyone or just you. Just send me a name of a website and I'll do the rest!`
  );
});

bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
  if (!(message instanceof TextMessage)) {
    say(response, `Sorry. I can only understand text messages.`);

    if (message instanceof PictureMessage) {
      say(response, `You sent picture message`);
    }
  }
});

bot.onTextMessage(/./, (message, response) => {
  botResponse(response, message.text);
});

bot
  .getBotProfile()
  .then((response) => console.log(`Bot Named: ${response.name}`));

module.exports = bot;
