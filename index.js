"use strict";

require("dotenv").config();
const ViberBot = require("viber-bot").Bot;
const BotEvents = require("viber-bot").Events;

const TextMessage = require("viber-bot").Message.Text;
const UrlMessage = require("viber-bot").Message.Url;
const ContactMessage = require("viber-bot").Message.Contact;
const PictureMessage = require("viber-bot").Message.Picture;
const VideoMessage = require("viber-bot").Message.Video;
const LocationMessage = require("viber-bot").Message.Location;
const StickerMessage = require("viber-bot").Message.Sticker;
const FileMessage = require("viber-bot").Message.File;
const RichMediaMessage = require("viber-bot").Message.RichMedia;
const KeyboardMessage = require("viber-bot").Message.Keyboard;

const ngrok = require("./get_public_url");

function say(response, message) {
  response.send(new TextMessage(message));
}

function checkUrlAvailability(botResponse, text_received) {
  let sender_name = botResponse;
  let sender_id = botResponse.userProfile.id;
  console.log(botResponse);

  say(botResponse, "One second...Let me check!");

  let message;
  if (text_received === "text") {
    // ================================
    // TextMessage object
    // ================================
    message = new TextMessage("hello world");
  } else if (text_received === "contact") {
    // ================================
    // Contact Message object
    // ================================
    let contactName = "Ko Ko";
    let contactPhoneNumber = "09420084765";
    message = new ContactMessage(contactName, contactPhoneNumber);
  } else if (text_received === "rich_media") {
    // ================================
    // RichMedia Message object
    // ================================
    const SAMPLE_RICH_MEDIA = {
      ButtonsGroupColumns: 6,
      ButtonsGroupRows: 5,
      BgColor: "#FFFFFF",
      Buttons: [
        {
          ActionBody: "https://www.google.com",
          ActionType: "open-url",
          BgMediaType: "picture",
          Image:
            "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
          BgColor: "#000000",
          TextOpacity: 60,
          Rows: 4,
          Columns: 6,
        },
        {
          ActionBody: "https://www.facebook.com",
          ActionType: "open-url",
          BgColor: "#85bb65",
          Text: "Buy",
          TextOpacity: 60,
          Rows: 1,
          Columns: 6,
        },
      ],
    };
    message = new RichMediaMessage(SAMPLE_RICH_MEDIA);
  }

  botResponse.send(message);
}

const bot = new ViberBot({
  authToken: process.env.ACCESS_TOKEN,
  name: "Dendo",
  avatar: "https://developers.viber.com/docs/img/stickers/40122.png", // It is recommended to be 720x720, and no more than 100kb.
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
