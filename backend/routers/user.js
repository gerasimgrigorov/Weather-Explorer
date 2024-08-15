const express = require("express");
const router = express.Router();
const pool = require("../db");
const { route } = require("./authentication");
const { isValidEmail, isValidUsername } = require("../utils/validation");

router.post("/update", async (req, res) => {
  const { username, email } = req.body;
  const userId = req.session.userId;

  // Validate email and username
  if (!isValidEmail(email)) {
    console.log("Invalid email");
    return res.status(400).json({ error: "Invalid email format." });
  }

  if (!isValidUsername(username)) {
    console.log("Invalid username");
    return res
      .status(400)
      .json({ error: "Username must be at least 3 characters long." });
  }

  try {
    // Check if the new username or email already exists for another user
    const result = await pool.query(
      "SELECT id FROM users WHERE (username = $1 OR email = $2)",
      [username, email]
    );

    if (result.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Username or email already taken." });
    }

    await pool.query(
      "UPDATE users SET username = $1, email = $2 WHERE id = $3",
      [username, email, userId]
    );

    res.json({ message: "Updated the user successfully." });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: "An error occurred while updating the user." });
  }
});

module.exports = router;
