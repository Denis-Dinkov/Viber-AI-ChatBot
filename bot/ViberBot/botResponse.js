const TextMessage = require("viber-bot").Message.Text;
const assistantResponse = require("../OpenAi/assistantResponse.js");
const subscriptionsList = require("./subscriptionsList.js");
const io = require("socket.io-client");

const socket = io("http://localhost:3001");

let subscribed = false;

function say(response, message) {
  response.send(new TextMessage(message));
}

async function botResponse(botResponse, text_received, id) {
  let sender_id = botResponse.userProfile.id;
  await socket.emit("getSubscribedUsers", sender_id);
  await socket.on("setSubscribedUsers", (isSub) => (subscribed = isSub));
  console.log(subscribed);

  if (subscribed) {
    // assistantResponse(botResponse, text_received, say);
    say(botResponse, "You are subscribed to our service.");
  } else {
    say(
      botResponse,
      "You are not subscribed to our service. Please subscribe to continue."
    );
    subscriptionsList(botResponse, id);
  }
}

module.exports = botResponse;
