const { Router } = require("express")
const router = Router();
const userRouter = require("../handlers/userHandler.js")
const degreeRouter = require("../handlers/degreesHandler.js")

router.use("/usuario", userRouter)
router.use("/carrera", degreeRouter)
module.exports = router;