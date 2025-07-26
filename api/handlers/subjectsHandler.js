const { Router } = require("express");
const router = Router();
const createSubject = require("../controllers/Subjects/createSubject.js");
const getSubject = require("../controllers/Subjects/getSubject.js");
const {
  validateSubjectValues,
  validateEmptyEntriesS,
  validateQueryParamsS,
  validateTeacherId,
} = require("../validations/subjectValidations.js");
const deleteSubject = require("../controllers/Subjects/deleteSubject.js");
const updateSubject = require("../controllers/Subjects/updateSubject.js");
const authMiddleware = require("../utils/authMiddleware.js");
const { authDirector, authDirectorProfesor } = require("../utils/authRoles");
const promoteUser = require("../controllers/Degrees/promoteUser.js");
const deleteStudentData = require("../controllers/Subjects/deleteStudentData.js");

router.post(
  "/",
  authMiddleware,
  authDirector,
  validateSubjectValues,
  validateEmptyEntriesS,
  validateTeacherId,
  async (req, res) => {
    await deleteStudentData(req);
    const newProfesor = await promoteUser(req.body);

    if (!newProfesor.content.length) {
      res.status(404).json({ error: "no se encontro alumno con ese id" });
    } else {
      const result = await createSubject(req.body);
      const created = await getSubject(result.content);
      let status = !result.status ? 201 : 500;
      res.status(status).json(created[0]);
    }
  }
);

router.get("/", authMiddleware, validateQueryParamsS, async (req, res) => {
  let newQuery = { ...req.query };

  if ("profesor" in req.query) {
    newQuery.profesor = req.user.id;
  }

  const result = await getSubject(newQuery);

  if (!result.length) {
    res.status(404).json({ error: "no se encontro la materia" });
  } else {
    res.status(200).json(req.query.id ? result[0] : result);
  }
});

router.delete("/:id", authMiddleware, authDirector, async (req, res) => {
  const result = await deleteSubject(req);

  if (!result) {
    res
      .status(404)
      .json({ error: "No se puede eliminar una materia que no existe" });
  } else {
    res.status(200).json(result);
  }
});

router.patch(
  "/:id",
  authMiddleware,
  authDirectorProfesor,
  validateSubjectValues,
  async (req, res) => {
    const { profesor } = req.body;

    if (profesor) {
      await deleteStudentData(req);
      await promoteUser(req.body);
    }

    const result = await updateSubject(req.body, req.params.id);
    if (!result) {
      res.status(404).json({ error: "La materia no existe" });
    } else {
      res.status(200).json(result);
    }
  }
);

module.exports = router;
