const TextMessage = require("viber-bot").Message.Text;
const assistantResponse = require("../OpenAi/assistantResponse.js");
const subscriptionsList = require("./subscriptionsList.js");

function say(response, message) {
  response.send(new TextMessage(message));
}

async function botResponse(botResponse, text_received, id) {
  let sender_id = botResponse.userProfile.id;
  console.log(sender_id);

  // assistantResponse(botResponse, text_received, say);
  say(botResponse, "Hello, " + sender_name.userProfile.name + "!");
  subscriptionsList(botResponse, id);
}

module.exports = botResponse;
