const TextMessage = require("viber-bot").Message.Text;
const assistantResponse = require("../OpenAi/assistantResponse.js");
const subscriptionsList = require("./subscriptionsList.js");
const io = require("socket.io-client");

const socket = io("http://localhost:3001");

socket.on("connect_error", (error) => {
  console.error(`Connection error: ${error}`);
});

function botResponse(response, textReceived, id) {
  const senderId = response.userProfile.id;
  socket.emit("checkSubscription", senderId);

  socket.once("subscriptionStatus", (status) => {
    console.log(status);
    const subscribed = status.active_subscription;

    if (status) {
      response.send(new TextMessage("You are subscribed to our service."));
    } else {
      response.send(
        new TextMessage(
          "You are not subscribed to our service. Please subscribe to continue."
        )
      );
      subscriptionsList(response, id);
    }
  });
}

module.exports = botResponse;
