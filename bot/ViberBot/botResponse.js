const TextMessage = require("viber-bot").Message.Text;
const assistantResponse = require("../OpenAi/assistantResponse.js");
const subscriptionsList = require("./subscriptionsList.js");
const io = require("socket.io-client");

const socket = io("http://localhost:3001");

let subscribed_users = [];

socket.emit("getSubscribedUsers");
socket.on("setSubscribedUsers", (data) => (subscribed_users = data));

function say(response, message) {
  response.send(new TextMessage(message));
}

async function botResponse(botResponse, text_received, id, isSubscribed) {
  let sender_id = botResponse.userProfile.id;

  if (subscribed_users.includes(sender_id)) {
    assistantResponse(botResponse, text_received, say);
  } else {
    say(
      botResponse,
      "You are not subscribed to our service. Please subscribe to continue."
    );
    subscriptionsList(botResponse, id);
  }
}

module.exports = botResponse;
