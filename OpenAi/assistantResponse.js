const TextMessage = require("viber-bot").Message.Text;
const OpenAI = require("openai");
const openai = new OpenAI();

let chatHistory = []; // Move chatHistory outside the function

async function assistantResponse(botResponse, text_received, say) {
  let isResponseReceived = false;

  const timeoutId = setTimeout(() => {
    if (!isResponseReceived) {
      say(botResponse, "One second...Let me check!");
    }
  }, 1000); // 1000 milliseconds = 1 second

  try {
    const messages = chatHistory.map(({ role, content }) => {
      return { role, content }; // Return the object
    });

    messages.push({ role: "user", content: text_received });

    let response = await openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
    });

    isResponseReceived = true;
    clearTimeout(timeoutId);

    let message = response.choices[0].message.content;
    botResponse.send(new TextMessage(message));

    chatHistory.push({ role: "user", content: text_received });
    chatHistory.push({ role: "assistant", content: message });
  } catch (error) {
    isResponseReceived = true;
    clearTimeout(timeoutId); // clear the timeout if an error occurs
    console.error("An error occurred:", error);
    say(botResponse, "Sorry, I couldn't process your request.");
  }
}

module.exports = assistantResponse;
