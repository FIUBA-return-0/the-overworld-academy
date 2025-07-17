const { Router } = require("express");
const router = Router();
const createDegree = require("../controllers/Degrees/createDegree.js");
const getAllDegrees = require("../controllers/Degrees/getAllDegrees.js");
const {
  validateDegreeValues,
  validateEmptyEntriesD,
} = require("../validations/degreeValidations.js");
const getDegree = require("../controllers/Degrees/getDegree.js");
const deleteDegree = require("../controllers/Degrees/deleteDegree.js");
const updateDegree = require("../controllers/Degrees/updateDegree.js");
const authMiddleware = require("../utils/authMiddleware.js");
const { authDirector } = require("../utils/authRoles");
const promoteUser = require("../controllers/Degrees/promoteUser.js");

router.post(
  "/",
  authMiddleware,
  authDirector,
  validateDegreeValues,
  validateEmptyEntriesD,
  async (req, res) => {
    const result = await createDegree(req.body);
    const created = await getDegree(result.content);

    let status = !result.status ? 201 : 500;
    res.status(status).json(created);
  }
);

router.get("/", async (req, res) => {
  const result = await getAllDegrees();

  if (!result.length) {
    res.status(404).json({ error: "no hay carreras disponibles" });
  } else {
    res.status(200).json(result);
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  const degree = await getDegree(req.params);

  if (!degree) {
    res.status(404).json({ error: "La carrera no existe" });
  } else {
    res.status(200).json(degree);
  }
});

router.delete("/:id", authMiddleware, authDirector, async (req, res) => {
  const result = await deleteDegree(req.params);

  if (!result) {
    res
      .status(404)
      .json({ error: "No se puede eliminar una carrera que no existe" });
  } else {
    res.status(200).json(result);
  }
});

router.patch(
  "/:id",
  authMiddleware,
  authDirector,
  validateDegreeValues,
  validateEmptyEntriesD,
  async (req, res) => {
    const { id } = req.params;
    const result = await updateDegree(req.body, id);

    if (!result) {
      res.status(404).json({ error: "La carrera no existe" });
    } else {
      res.status(200).json(result);
    }
  }
);

module.exports = router;
