const jwt = require("jsonwebtoken");

/**
 * protect
 * Verifies the Bearer JWT in the Authorization header.
 * On success  → attaches the decoded payload to req.user and calls next().
 * On failure  → responds 401 { success: false, message: "Not authorized" }.
 */
const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, name, email, iat, exp }
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }
};

module.exports = { protect };
