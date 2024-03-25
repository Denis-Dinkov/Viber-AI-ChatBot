require("dotenv").config();
const { STRIPE_SECRET_KEY, Yearly_PLAN_ID } = process.env;
const stripe = require("stripe")(STRIPE_SECRET_KEY);
const userServices = require("./userService");

const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.query.id;
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
    console.log(sessionId);
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
      stripe_id: session.customer,
      status: session.status,
      subscription: session.subscription,
    };

    if (session && sessionResult.status === "complete") {
      await userServices.changeUserSubscription(userId, true);
    }

    return res.status(200).json(stripeDetails);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send("Internal server error");
  }
};

const getUserData = async (id) => {
  try {
    const user = await userServices.getUser(id);

    if (user && user.stripe_details.sessionId) {
      const session = await await stripe.subscriptions.retrieve(
        "cs_test_a1h7zQFi0ijfG5ImlQxfqBBZN3ADjNxawY7AKsimxe4Vz4KHRNFNTC2AQC"
      );

      // console.log(session);2
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createCheckoutSession,
  checkCheckoutSession,
  getUserData,
};
