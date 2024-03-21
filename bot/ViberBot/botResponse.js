const TextMessage = require("viber-bot").Message.Text;
const assistantResponse = require("../OpenAi/assistantResponse.js");
const subscriptionsList = require("./subscriptionsList.js");

function say(response, message) {
  response.send(new TextMessage(message));
}

async function botResponse(botResponse, text_received, id, isSubscribed) {
  let sender_id = botResponse.userProfile.id;

  if (isSubscribed) {
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
