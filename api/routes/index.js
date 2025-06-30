const { Router } = require("express")
const router = Router();
const userRouter = require("../handlers/user_routes.js")
const degreeRouter = require("../handlers/degrees_routes.js")

router.use("/usuario", userRouter)
router.use("/carrera", degreeRouter)
module.exports = router;