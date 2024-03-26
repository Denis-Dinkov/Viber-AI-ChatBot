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
  console.log("step 1");
  try {
    const userId = req.query.id;
    const { stripe_details: stripeDetails } = await userServices.getUser(
      userId
    );

    const { subscription, payment_status, status, ...data } =
      await stripe.checkout.sessions.retrieve(
        stripeDetails.checkout_session_id
      );

    console.log("step 2");

    console.log(stripeDetails, status);

    if ((stripeDetails && status === "complete") || status === "open") {
      console.log("step 3");
      await userServices.changeUserSubscription(subscription, userId, true);
    }

    return res.status(200).json(stripeDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const checkUserSubscription = async (id) => {
  try {
    const user = await userServices.getUser(id);
    const { active_subscription, subscription_id: subId } =
      user?.stripe_details;

    if (user && subId) {
      const subscriptionDetails = await stripe.subscriptions.retrieve(subId);
      const subStatus = subscriptionDetails?.status === "active" ? true : false;

      if (active_subscription !== subStatus) {
        await userServices.changeUserSubscription(subId, id, false);
      }

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
  checkUserSubscription,
};
