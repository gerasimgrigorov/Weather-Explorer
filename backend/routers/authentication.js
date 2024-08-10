const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../db");

const { isValidEmail, isValidPassword, isValidUsername } = require("../utils/validation")

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  console.log("Data:", { username, email, password });

  // Validate inputs
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (!isValidEmail(email)) {
    console.log("SMALL EMAIL")
    return res.status(400).json({ error: "Invalid email format." });
  }

  if (!isValidUsername(username)) {
    console.log("SMALL USERNAME")
    return res.status(400).json({ error: "Username must be at least 3 characters long." });
  }

  if (!isValidPassword(password)) {
    console.log("SMALL PASSWORD")
    return res.status(400).json({ error: "Password must be at least 8 characters long." });
  }

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR username = $2",
      [email, username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email or username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    console.log("New user added:", newUser.rows[0]); 

    return res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error("Registration error:", error.message);
    return res.status(500).json({ error: "Registration failed", details: error.message });
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
    res.json({ message: "Successfully logged in.", user: user.rows[0] });
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

router.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() as current_time");
    res.status(200).json({ message: "Database connected!", result: result.rows });
  } catch (error) {
    console.error("Database connection test failed:", error.message);
    res.status(500).json({ error: "Database connection failed", details: error.message });
  }
});

module.exports = router;
