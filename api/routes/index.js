const { Router } = require("express")
const router = Router();
const userRouter = require("../handlers/userHandler.js")
const degreeRouter = require("../handlers/degreesHandler.js")
const subjectRouter = require("../handlers/subjectsHandler.js")

router.use("/usuario", userRouter)
router.use("/carrera", degreeRouter)
router.use("/materia", subjectRouter)
module.exports = router;