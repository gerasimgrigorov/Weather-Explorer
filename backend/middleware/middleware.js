const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.cookies.token || req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Assuming the token contains the user's ID as 'id'
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
}

module.exports = authenticateToken
