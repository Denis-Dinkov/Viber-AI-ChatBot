const TextMessage = require("viber-bot").Message.Text;
const assistantResponse = require("../OpenAi/assistantResponse.js");

function say(response, message) {
  response.send(new TextMessage(message));
}

async function botResponse(botResponse, text_received) {
  let sender_name = botResponse;
  let sender_id = botResponse.userProfile.id;

  assistantResponse(botResponse, text_received, say);
}

module.exports = botResponse;
