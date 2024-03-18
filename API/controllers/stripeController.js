require("dotenv").config();
const { STRIPE_SECRET_KEY, Yearly_PLAN_ID } = process.env;

const stripe = require("stripe")(STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: "http://www.google.com",
      cancel_url: "http://www.youtube.com",
      line_items: [
        {
          price: process.env.YEARLY_PLAN_ID, // Make sure to define this in your .env file
          quantity: 1,
        },
      ],
      mode: "subscription",
    });

    console.log("session", session.id, session.url, session);
    const sessionId = session.id;
    // socket.emit("session", sessionId);
    res.json({ url: session.url });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  createCheckoutSession,
};
