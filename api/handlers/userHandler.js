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
const deleteInscription = require("../controllers/Inscriptions/deleteInscription.js");
const deleteGrade = require("../controllers/Grades/deleteGrade.js");
const checkPasswordStrength = require("../validations/checkPasswordStrength.js");

router.post(
  "/",
  validateUserValues,
  validateEmptyEntriesU,
  validateDegreeId,
  async (req, res) => {
    if (checkPasswordStrength(req.body.password)) {
      return res.status(400).json({ error: "contraseña insegura" });
    }
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    const result = await createUser(req.body);

    if (!result.status) {
      const { id, nombre, apellido, condicion, username, carrera, foto, bio } =
        await getUser(result.content);

      return res.status(201).json({
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
    const {
      id,
      nombre,
      apellido,
      condicion,
      username,
      carrera,
      carreraid,
      foto,
      bio,
    } = user;
    res.status(200).json({
      id,
      nombre,
      apellido,
      condicion,
      username,
      carrera,
      carreraid,
      foto,
      bio,
    });
  }
});

router.patch(
  "/",
  authMiddleware,
  validateUserValues,
  validateDegreeId,
  validateEmptyEntriesU,
  async (req, res) => {
    if ("password" in req.body) {
      if (checkPasswordStrength(req.body.password)) {
        return res.status(400).json({ error: "contraseña insegura" });
      }

      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(req.body.password, salt);
      req.body.password = hash;
    }

    const result = await updateUser(req.body, req.user.id);

    if (!result) {
      res.status(404).json({ error: "El usuario no existe" });
    } else {
      const { nombre, apellido, id, condicion, username, carrera, foto, bio } =
        result;
      res.status(200).json({
        nombre,
        apellido,
        id,
        condicion,
        username,
        carrera,
        foto,
        bio,
      });
    }
  }
);

router.delete("/", authMiddleware, async (req, res) => {
  await deleteInscription(req.user);
  await deleteGrade(req.user);
  const result = await deleteUser(req.user);

  res.status(200).json(result);
});

module.exports = router;
