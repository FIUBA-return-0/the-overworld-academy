const { Router } = require("express");
const router = Router();
const createUser = require("../controllers/Users/createUser.js");
const getUser = require("../controllers/Users/getUser.js");
const {
  validateUserValues,
  validateEmptyEntriesU,
  validateSentCondition,
  validateChangeCondition,
  validateDegreeId,
} = require("../validations/userValidations.js");
const getAllUsers = require("../controllers/Users/getAllUsers.js");
const updateUser = require("../controllers/Users/updateUser.js");
const bcrypt = require("bcryptjs");
const deleteUser = require("../controllers/Users/deleteUser.js");
const authMiddleware = require("../utils/authMiddleware.js");
const { authProfesor } = require("../utils/authRoles");

router.post(
  "/",
  validateUserValues,
  validateEmptyEntriesU,
  validateDegreeId,
  async (req, res) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    const result = await createUser(req.body);

    if (!result.status) {
      const { id, nombre, apellido, condicion, username, carrera, foto, bio } =
        await getUser(result.content);

      res.status(201).json({
        id,
        nombre,
        apellido,
        condicion,
        username,
        carrera,
        foto,
        bio,
      });
    }
    if (result.content.includes("already exists")) {
      res.status(409).json({ error: "el usuario ya existe" });
    } else {
      res.status(500).json(result.content);
    }
  }
);

router.get(
  "/",
  authMiddleware,
  authProfesor,
  validateSentCondition,
  async (req, res) => {
    const { rol } = req.query;
    const result = await getAllUsers(rol);

    if (!result.length) {
      res
        .status(404)
        .json({ error: "no se encontro el/los usuario/s buscado/s" });
    } else {
      res.status(200).json(result);
    }
  }
);

router.get("/self", authMiddleware, async (req, res) => {
  const user = await getUser({ id: req.user.id });

  if (!user) {
    res.status(404).json({ error: "el usuario no existe" });
  } else {
    const { id, nombre, apellido, condicion, username, carrera, foto, bio } =
      user;
    res.status(200).json({
      id,
      nombre,
      apellido,
      condicion,
      username,
      carrera,
      foto,
      bio,
    });
  }
});

router.patch(
  "/:id",
  authMiddleware,
  validateUserValues,
  validateChangeCondition,
  validateDegreeId,
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

router.delete("/", authMiddleware, async (req, res) => {
  console.log(req.user);

  const result = await deleteUser(req.user);

  if (!result) {
    res
      .status(404)
      .json({ error: "No se puede eliminar un alumno que no existe" });
  } else {
    res.status(200).json(result);
  }
});

module.exports = router;
