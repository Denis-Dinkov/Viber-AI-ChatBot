const TextMessage = require("viber-bot").Message.Text;
const OpenAI = require("openai");
const openai = new OpenAI();

let messages = [];

async function assistantResponse(botResponse, text_received, say) {
  messages.push({ role: "user", content: text_received });

  const timeoutId = setTimeout(() => {
    say(botResponse, "Моля изчакайте, асистентът отговаря! 🤖");
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
    say(
      botResponse,
      "Не успях да обработя вашето съобщение, моля опитайте отново или се свържете с админ! 😓"
    );
  } finally {
    clearTimeout(timeoutId);
  }
}

module.exports = assistantResponse;
