const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const checkData = require("../controllers/login/checkdata.js");
const tokenCreation = require("../utils/tokenCreate.js");

router.get("/", async (req, res) => {
  const { username, password, condicion, id } = await checkData(req);

  const access = await bcrypt.compare(req.body.password, password);

  !access && res.status(401).json({ error: "contra incorrecta" });

  const token = tokenCreation({ username, condicion, id });

  res.status(200).json(token);
});

module.exports = router;
