const TextMessage = require("viber-bot").Message.Text;
const assistantResponse = require("../OpenAi/assistantResponse.js");
const subscribtionsList = require("./subscribtionsList.js");

function say(response, message) {
  response.send(new TextMessage(message));
}

async function botResponse(botResponse, text_received, id) {
  let sender_name = botResponse;
  let sender_id = botResponse.userProfile.id;

  // assistantResponse(botResponse, text_received, say);
  say(botResponse, "Hello, " + sender_name.userProfile.name + "!");
  subscribtionsList(botResponse, id);
}

module.exports = botResponse;
