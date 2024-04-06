const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedData?.id;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = { auth };
