const express = require("express");
const router = express.Router();
const pool = require("../db");
const { isValidEmail, isValidUsername } = require("../utils/validation");

router.post("/update", async (req, res) => {
  const { username, email } = req.body;
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized, please log in." });
  }

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

    return res.json({ message: "Updated the user successfully." });
  } catch (e) {
    return res
      .status(500)
      .json({ error: "An error occurred while updating the user." });
  }
});

router.get("/favorites", async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized, please log in." });
  }

  try {
    const result = await pool.query(
      "SELECT latitude, longitude, address FROM favorite_locations WHERE user_id = $1",
      [userId]
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching favorite locations:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/favorites/check", async (req, res) => {
  const { latitude, longitude } = req.query;
  const userId = req.session.userId;

  console.log("From check: ", latitude, longitude);

  try {
    const query = await pool.query(
      "SELECT * FROM favorite_locations WHERE user_id = $1 AND latitude = $2 AND longitude = $3",
      [userId, latitude, longitude]
    );

    if (query.rows.length > 0) {
      return res.json({ isFavorited: true });
    } else {
      return res.json({ isFavorited: false });
    }
  } catch (e) {
    console.log("Error checking favorite status: ", e);
    return res.status(500).json({ message: "Initial server error" });
  }
});

router.post("/favorites", async (req, res) => {
  const { latitude, longitude, address } = req.body;
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized, please log in." });
  }

  try {
    await pool.query(
      "INSERT INTO favorite_locations (user_id, latitude, longitude, address) VALUES ($1, $2, $3, $4)",
      [userId, latitude, longitude, address]
    );
    return res.status(200).json({ message: "Location added to favorites." });
  } catch (e) {
    console.log("Error adding the location", e);
    return res.status(500).json({ message: "Failed to add the location." });
  }
});

router.delete("/favorites", async (req, res) => {
  const { latitude, longitude } = req.body;
  const userId = req.session.userId;

  console.log("Deleted location info: ", latitude, longitude);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized, please log in." });
  }

  try {
    await pool.query(
      "DELETE FROM favorite_locations WHERE user_id = $1 AND latitude = $2 AND longitude = $3",
      [userId, latitude, longitude]
    );
    return res
      .status(200)
      .json({ message: "Location removed from favorites." });
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
