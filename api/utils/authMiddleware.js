const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWTSECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth)
    return res.status(401).json({ error: "authorization header not sent" });

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWTSECRET, { algorithms: "HS256" });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
  res.send;
};

module.exports = authMiddleware;
