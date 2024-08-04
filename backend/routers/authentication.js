const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../db");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR username = $2",
      [email, username]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Email or username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSTER INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    return res.status(201).json(newUser.rows[0]);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const validatePassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validatePassword) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token);
    res.json({ message: "Successfully logged in." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Successfully logged out." });
});

router.get("/check", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ user: null });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    pool.query("SELECT * FROM users WHERE id = $1", [decoded.id], (error, results) => {
      if (error || results.rows.length === 0) {
        return res.status(401).json({ user: null });
      }
      const user = results.rows[0];
      res.status(200).json({ user });
    });
  } catch (err) {
    res.status(401).json({ user: null });
  }
})

module.exports = router;
