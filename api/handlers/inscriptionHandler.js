const { Router } = require("express");
const router = Router();
const getAllInscriptions = require("../controllers/Inscriptions/getAllInscriptions");
const deleteInscription = require("../controllers/Inscriptions/deleteInscription");
const postInscription = require("../controllers/Inscriptions/postInscription");
const getInscription = require("../controllers/Inscriptions/getInscription");
const updateInscription = require("../controllers/Inscriptions/updateInscription");
const {
  validateQueryParamsI,
  validateStudentCondition,
  validateEmptyBodyI,
  validateEmptyEntriesI,
} = require("../validations/inscriptionValidations");
const authMiddleware = require("../utils/authMiddleware");
const { authProfesor } = require("../utils/authRoles");

router.get("/", authMiddleware, validateQueryParamsI, async (req, res) => {
  const result = await getAllInscriptions(req.query);

  if (!result.length) {
    res.status(400).json({ error: "no se encontro la inscripcion" });
  } else {
    res.status(200).json(result);
  }
});

router.patch(
  "/",
  authMiddleware,
  authProfesor,
  async (req, res) => {
    const result = await updateInscription(req.query);
    if (!result.status) {
      const updated = await getInscription(result.content);
      res.status(200).json(updated[0]);
    } else {
      res.status(400).json(result.content);
    }
  }
);

router.get("/:id", async (req, res) => {
  const result = await getInscription(req.params);

  if (!result.length) {
    res.status(400).json({ error: "no se encontro la inscripcion" });
  } else {
    res.status(200).json(result[0]);
  }
});

router.post("/", validateEmptyBodyI, validateEmptyEntriesI, async (req, res) => {
  const result = await postInscription(req.body);

  if (!result.status) {
    const created = await getInscription(result.content);
    res.status(200).json(created[0]);
  } else {
    res.status(400).json(result.content);
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const result = await getInscription(req.params);

  if (!result.length) {
    res.status(400).json({ error: "no se encontro la inscripcion" });
  } else {
    await deleteInscription(req.params);
    res.status(200).json(result[0]);
  }
});
module.exports = router;
