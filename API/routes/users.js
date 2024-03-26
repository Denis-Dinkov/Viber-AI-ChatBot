const express = require("express");
const router = express.Router();

const userService = require("../services/userService");

router.get("/", userService.getAllUsers);

module.exports = router;
