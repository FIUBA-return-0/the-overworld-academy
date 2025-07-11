require("dotenv").config();
const { JWTSECRET } = process.env;
const jwt = require("jsonwebtoken");

const tokenCreation = (data) => {
  const token = jwt.sign(data, JWTSECRET, { algorithm: "HS256" });
  return token;
};

module.exports = tokenCreation;
