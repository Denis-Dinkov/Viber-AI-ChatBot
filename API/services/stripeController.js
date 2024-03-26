require("dotenv").config();
const { STRIPE_SECRET_KEY, Yearly_PLAN_ID } = process.env;
const stripe = require("stripe")(STRIPE_SECRET_KEY);
const userServices = require("./userService");

const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.query.id;
    const session = await stripe.checkout.sessions.create({
      success_url: `http://localhost:5173/success?id=${userId}`,
      cancel_url: "http://localhost:5173/success",
      line_items: [
        {
          price: process.env.YEARLY_PLAN_ID, // Make sure to define this in your .env file
          quantity: 1,
        },
      ],
      mode: "subscription",
    });

    await userServices.changeUserSession(userId, session.id);

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error(error);
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

    console.log(session);

    const sessionResult = {
      id: session.id,
      stripe_id: session.customer,
      status: session.status,
      subscription: session.subscription,
    };

    if (session && sessionResult.status === "complete") {
      await userServices.changeUserSubscription(
        session.subscription,
        userId,
        true
      );
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
    // console.log(user);

    if (user && user.stripe_details.stripe_id) {
      const session = await await stripe.subscriptions.retrieve(
        user.stripe_details.stripe_id
      );

      const subStatus = session.status === "active" ? true : false;
      console.log(subStatus);
      // console.log(user.stripe_details.stripe_id);

      return subStatus;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  createCheckoutSession,
  checkCheckoutSession,
  getUserData,
};
