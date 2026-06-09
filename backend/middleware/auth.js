const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback_secret_key"
    );

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
}

module.exports = authMiddleware;