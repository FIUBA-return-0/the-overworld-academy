const { Router } = require("express");
const router = Router();
const createUser = require("../controllers/Users/createUser.js");
const getUser = require("../controllers/Users/getUser.js");
const {
  validateCreateUser,
  validateSentCondition,
  validateChangeCondition,
} = require("../validations/userValidations.js");
const getAllUsers = require("../controllers/Users/getAllUsers.js");
const updateUser = require("../controllers/Users/updateUser.js");

router.post("/", validateCreateUser, async (req, res) => {
  const result = await createUser(req.body);
  const created = await getUser(result.content);
  let status = !result.status ? 201 : 500;
  res.status(status).json(created);
});

router.get("/", validateSentCondition, async (req, res) => {
  const { rol } = req.query;
  const result = await getAllUsers(rol);

  if (!result.length) {
    res
      .status(404)
      .json({ error: "no se encontro el/los usuario/s buscado/s" });
  } else {
    res.status(200).json(result);
  }
});

router.get("/:id", async (req, res) => {
  const user = await getUser(req.params);

  if (!user) {
    res.status(404).json({ error: "el usuario no existe" });
  } else {
    res.status(200).json(user);
  }
});

router.put(
  "/:id",
  validateCreateUser,
  validateChangeCondition,
  async (req, res) => {
    const { id } = req.params;

    const result = await updateUser(req.body, id);

    if (!result) {
      res.status(404).json({ error: "El usuario no existe" });
    } else {
      res.status(200).json(result);
    }
  }
);

module.exports = router;
