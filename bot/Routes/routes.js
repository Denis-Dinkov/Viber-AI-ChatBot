const express = require("express");
const router = express.Router();

//create user
router.post("/user", (req, res) => {
  res.send("User created");
});

//get user
router.get("/user/:id", (req, res) => {});

//deactivate user
router.patch("/user/:id", (req, res) => {});

module.exports = router;
