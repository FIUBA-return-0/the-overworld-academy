const { Router } = require("express");
const router = Router();
const getGrade = require("../controllers/Grades/getGrades");
const postGrade = require("../controllers/Grades/postGrade");
const updateGrade = require("../controllers/Grades/updateGrade");
const deleteGrade = require("../controllers/Grades/deleteGrade.js");
const authMiddleware = require("../utils/authMiddleware");
const { authProfesor } = require("../utils/authRoles.js");
const {
  validateEmptyEntriesG,
  validateGradeValues,
} = require("../validations/gradesValidations.js");

router.get("/", authMiddleware, async (req, res) => {
  const result = await getGrade(req.body);

  if (!result.length) {
    res.status(400).json({
      error: "no se encontro la nota",
    });
  } else {
    res.status(200).json(result);
  }
});

router.post(
  "/",
  authMiddleware,
  authProfesor,
  validateGradeValues,
  validateEmptyEntriesG,
  async (req, res) => {
    const result = await postGrade(req.body);
    if (!result.status) {
      const created = await getGrade(req.body);
      res.status(201).json(created[0]);
    } else {
      res.status(400).json({ error: result.content });
    }
  }
);

router.put("/", authMiddleware, authProfesor, async (req, res) => {
  const result = await updateGrade(req.body);
  if (!result.length) {
    res.status(400).json({ error: "No se encontró la nota." });
  } else {
    const created = await getGrade(req.body);
    res.status(201).json(created[0]);
  }
});

router.delete("/", authMiddleware, async (req, res) => {
  const result = await deleteGrade(req.user);

  if (!result.length) {
    res.status(404).json({ error: "no se encontro la nota" });
  } else {
    res.status(200).json(result);
  }
});

module.exports = router;
