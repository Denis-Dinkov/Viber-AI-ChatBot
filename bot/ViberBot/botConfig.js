const ViberBot = require("viber-bot").Bot;
const BotEvents = require("viber-bot").Events;
const TextMessage = require("viber-bot").Message.Text;
const botResponse = require("./botResponse.js");

const io = require("socket.io-client");

const socket = io("http://localhost:3001");

function say(response, message) {
  response.send(new TextMessage(message));
}

const bot = new ViberBot({
  authToken: process.env.ACCESS_TOKEN,
  name: "Dendo",
  avatar:
    "https://avatars.githubusercontent.com/u/101288849?s=400&u=c53bebb724e88d792d24e7a062919593e5dbe4b1&v=4",
});

bot.onConversationStarted((userProfile, isSubscribed, context, onFinish) => {
  onFinish(new TextMessage(`Hi, ${userProfile.name}! Nice to meet you.`));
});

bot.onSubscribe((response) => {
  if (socket.connected) {
    try {
      socket.emit("subscribe", response.userProfile.id);
      console.log(`Subscribed: ${response.userProfile.id}`);
    } catch (error) {
      console.error(error);
    }
  }

  say(
    response,
    `Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me if a web site is down for everyone or just you. Just send me a name of a website and I'll do the rest!`
  );
});

bot.onUnsubscribe((userId) => {
  try {
    console.log(`Unsubscribed: ${userId}`);
    if (socket.connected) socket.emit("unsubscribe", userId);
  } catch (error) {
    console.error(error);
  }
});

bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
  if (!(message instanceof TextMessage)) {
    say(response, `Съжалявам, но не разпознавам този тип съобщение! `);
  }
});

bot.onTextMessage(/./, async (message, response) => {
  const { id: uid, name, avatar } = response.userProfile;
  if (socket.connected) {
    socket.emit("message", { uid, name, avatar, text: message.text });
  }

  botResponse(response, message.text);
});

module.exports = bot;
