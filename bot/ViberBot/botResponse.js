const TextMessage = require("viber-bot").Message.Text;
const assistantResponse = require("../OpenAi/assistantResponse.js");
const subscriptionsList = require("./subscriptionsList.js");
const io = require("socket.io-client");

const socket = io("http://localhost:3001");

function say(response, message) {
  response.send(new TextMessage(message));
}

function botResponse(botResponse, text_received, id) {
  let sender_id = botResponse.userProfile.id;
  socket.emit("checkSubscription", sender_id);
  socket.once("subscriptionStatus", (status) => {
    console.log(status);
    let subscribed = status.active_subscription;

    if (status) {
      say(botResponse, "You are subscribed to our service.");
    } else {
      say(
        botResponse,
        "You are not subscribed to our service. Please subscribe to continue."
      );
      subscriptionsList(botResponse, id);
    }
  });
}
module.exports = botResponse;
