const express = require("express");
const router = express.Router();
const stripeController = require("../services/stripeService");

router.post("/create-session", stripeController.createCheckoutSession);
router.get("/check-session", stripeController.checkCheckoutSession);

module.exports = router;
