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
  validateStudentId,
  validateSubjectId,
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
  validateStudentId,
  validateSubjectId,
  validateEmptyEntriesG,
  async (req, res) => {
    const { alumno, materia, description } = req.body;
    const grade = await getGrade({ alumno, materia, description });

    let newGrade = {};
    if (!grade.length) {
      console.log("la nota no existe, la creo");

      const result = await postGrade(req.body);
      newGrade = result.content;
    } else {
      console.log("la nota existe, la modifico");

      const result = await updateGrade(req.body);
      newGrade = result[0];
    }

    const result = await getGrade(newGrade);
    res.status(200).json(result[0]);
  }
);

router.put(
  "/",
  authMiddleware,
  authProfesor,
  validateGradeValues,
  validateStudentId,
  validateSubjectId,
  validateEmptyEntriesG,
  async (req, res) => {
    const result = await updateGrade(req.body);
    if (!result.length) {
      res.status(400).json({ error: "No se encontró la nota." });
    } else {
      const created = await getGrade(req.body);
      res.status(201).json(created[0]);
    }
  }
);

router.delete("/", authMiddleware, async (req, res) => {
  const result = await deleteGrade(req.user);

  if (!result.length) {
    res.status(404).json({ error: "no se encontro la nota" });
  } else {
    res.status(200).json(result);
  }
});

module.exports = router;
