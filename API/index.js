require("dotenv").config();
const { PORT, STRIPE_SECRET_KEY } = process.env;
const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const UserService = require("./services/userService");
const stripeController = require("./services/stripeService");
const stripe = require("stripe")(STRIPE_SECRET_KEY);
const user = require("./models/user");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/viberBot");
let secretKey =
  "whsec_64ec8a98ab1dc5e8b4728554c391cb0327ec80bf6d171efb509b9a99fa5584ff";
app.use(cors()); // Use cors middleware
app.use(express.urlencoded({ extended: true }));

fs.readdirSync(path.join(__dirname, "routes")).forEach((file) => {
  const route = require(`./routes/${file}`);
  const routePath = `/${path.parse(file).name}`;
  app.use(routePath, route);
});

app.listen(PORT, () => {
  console.log(`REST API server listening at http://localhost:${PORT}`);
  server.listen(Number(PORT) + 1, () => {
    console.log(
      `Socket io server listening at http://localhost:${Number(PORT) + 1}`
    );
  });
});

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, secretKey);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        console.log("PaymentIntent was successful!");
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

io.on("connection", (socket) => {
  console.log(`${socket.handshake.address} -> Client connected (${socket.id})`);

  socket.on("message", async (data) => {
    if (data.text === "subscribe") {
      UserService.setSubscribeStatus(data.uid, true);
    } else if (data.text === "unsubscribe") {
      UserService.setSubscribeStatus(data.uid, false);
    }

    UserService.addUser(data.uid, data.name, data.avatar);
  });

  socket.on("unsubscribe", async (userId) => {
    UserService.changeUserStatus(userId, false);
  });

  socket.on("subscribe", async (userId) => {
    UserService.changeUserStatus(userId, true);
  });

  socket.on("startSession", async (userId, sessionId) => {
    await UserService.changeUserSession(userId, sessionId);
    const users = await UserService.getSubscribedUsers();
    socket.emit("setSubscribedUsers", users);
  });

  socket.on("checkSubscription", async (userId) => {
    const data = await stripeController.checkUserSubscription(userId);
    socket.emit("subscriptionStatus", data);
  });
});
