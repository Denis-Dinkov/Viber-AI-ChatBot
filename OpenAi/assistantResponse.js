const TextMessage = require("viber-bot").Message.Text;
const OpenAI = require("openai");
const openai = new OpenAI();

let messages = [];

async function assistantResponse(botResponse, text_received, say) {
  messages.push({ role: "user", content: text_received });

  const timeoutId = setTimeout(() => {
    say(botResponse, "One second...Let me check!");
  }, 1000);

  try {
    let response = await openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
    });

    let message = response.choices[0].message.content;
    botResponse.send(new TextMessage(message));

    messages.push({ role: "assistant", content: message });
  } catch (error) {
    console.error("An error occurred:", error);
    say(botResponse, "Sorry, I couldn't process your request.");
  } finally {
    clearTimeout(timeoutId); // clear the timeout always
  }
}

module.exports = assistantResponse;
