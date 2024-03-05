"use strict";

require("dotenv").config();
const OpenAI = require("openai");
const openai = new OpenAI();
const ViberBot = require("viber-bot").Bot;
const BotEvents = require("viber-bot").Events;
const TextMessage = require("viber-bot").Message.Text;
const PictureMessage = require("viber-bot").Message.Picture;

const ngrok = require("./get_public_url");

function say(response, message) {
  response.send(new TextMessage(message));
}

async function checkUrlAvailability(botResponse, text_received) {
  let sender_name = botResponse;
  let sender_id = botResponse.userProfile.id;

  let isResponseReceived = false;

  const timeoutId = setTimeout(() => {
    if (!isResponseReceived) {
      say(botResponse, "One second...Let me check!");
    }
  }, 1000); // 1000 milliseconds = 1 second

  try {
    let response = await openai.chat.completions.create({
      messages: [{ role: "system", content: text_received }],
      model: "gpt-3.5-turbo",
    });

    isResponseReceived = true;
    clearTimeout(timeoutId); // clear the timeout if the response is received

    let message = response.choices[0].message.content;
    botResponse.send(new TextMessage(message));
  } catch (error) {
    isResponseReceived = true;
    clearTimeout(timeoutId); // clear the timeout if an error occurs
    console.error("An error occurred:", error);
    say(botResponse, "Sorry, I couldn't process your request.");
  }
}

const bot = new ViberBot({
  authToken: process.env.ACCESS_TOKEN,
  name: "Dendo",
  avatar: "./profileimg.jpg", // It is recommended to be 720x720, and no more than 100kb.
});

// The user will get those messages on first registration

bot.onSubscribe((response) => {
  say(
    response,
    `Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me if a web site is down for everyone or just you. Just send me a name of a website and I'll do the rest!`
  );
});

// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
  // This sample bot can answer only text messages, let's make sure the user is aware of that.
  if (!(message instanceof TextMessage)) {
    say(response, `Sorry. I can only understand text messages.`);

    if (message instanceof PictureMessage) {
      say(response, `You sent picture message`);
    }
  }
});

bot.onTextMessage(/./, (message, response) => {
  checkUrlAvailability(response, message.text);
});

bot
  .getBotProfile()
  .then((response) => console.log(`Bot Named: ${response.name}`));

// Server
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
