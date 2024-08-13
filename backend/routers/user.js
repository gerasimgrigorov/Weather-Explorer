const express = require("express");
const router = express.Router();
const pool = require("../db");
const { route } = require("./authentication");

router.post("/", async (req, res) => {
  const { username, email } = req.body

  console.log(username, email)

  res.json({message: "Updated the user successfully."})
});

module.exports = router