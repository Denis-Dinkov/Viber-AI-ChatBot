require("dotenv").config();
const { STRIPE_SECRET_KEY, Yearly_PLAN_ID } = process.env;
const stripe = require("stripe")(STRIPE_SECRET_KEY);
const userServices = require("../services/userService");

const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.query.id; // Extract userId from the query parameters
    const session = await stripe.checkout.sessions.create({
      success_url: `http://localhost:5173/success?id=${userId}`, // Replace with your URL
      cancel_url: "http://localhost:5173/success",
      line_items: [
        {
          price: process.env.YEARLY_PLAN_ID, // Make sure to define this in your .env file
          quantity: 1,
        },
      ],
      mode: "subscription",
    });

    const sessionId = session.id;
    await userServices.changeUserSession(userId, sessionId);

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send("Internal server error");
  }
};

const checkCheckoutSession = async (req, res) => {
  try {
    const userId = req.query.id;
    const { stripe_details: stripeDetails } = await userServices.getUser(
      userId
    );

    const session = await stripe.checkout.sessions.retrieve(
      stripeDetails.sessionId
    );

    const sessionResult = {
      id: session.id,
      customer: session.customer,
      status: session.status,
      subscription: session.subscription,
    };

    // console.log(sessionResult);
    if (session && sessionResult.status === "complete") {
      await userServices.changeUserSubscription(userId, true);
    }

    return res.status(200).json(stripeDetails);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  createCheckoutSession,
  checkCheckoutSession,
};
