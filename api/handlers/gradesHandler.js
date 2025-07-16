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
  validateQueryParamsG,
} = require("../validations/gradesValidations.js");

router.get("/", authMiddleware, validateQueryParamsG, async (req, res) => {
  const { id, condicion } = req.user;

  const newQuery = {
    ...req.query,
    ...(condicion === "alumno" ? { alumno: id } : {}),
  };

  const result = await getGrade(newQuery);

  if (!result.length) {
    return res.status(400).json({ error: "no se encontró la nota" });
  }

  return res.status(200).json(result);
});

router.post(
  "/",
  authMiddleware,
  authProfesor,
  validateStudentId,
  validateSubjectId,
  validateEmptyEntriesG,
  validateGradeValues,
  async (req, res) => {
    const { alumno, materia, description } = req.body;
    const grade = await getGrade({ alumno, materia, description });

    let newGrade = {};
    if (!grade.length) {
      const result = await postGrade(req.body);
      newGrade = result.content;
    } else {
      const result = await updateGrade(req.body);
      newGrade = result[0];
    }

    const result = await getGrade(newGrade);
    res.status(200).json(result[0]);
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
