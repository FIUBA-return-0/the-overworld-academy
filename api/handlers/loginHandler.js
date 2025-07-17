const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const checkData = require("../controllers/login/checkdata.js");
const tokenCreation = require("../utils/tokenCreate.js");

router.post("/", async (req, res) => {
  const result = await checkData(req);
  if (!result) {
    return res.status(401).json({ error: "credenciales invalidas" });
  }
  const { username, password, condicion, id } = result;

  const access = await bcrypt.compare(req.body.password, password);

  if (!access) {
    return res.status(401).json({ error: "contraseña incorrecta" });
  }

  const token = tokenCreation({ username, condicion, id });

  res.status(200).json(token);
});

module.exports = router;
