const { Router } = require("express")
const router = Router();
const userRouter = require("../handlers/user_routes.js")

router.use("/usuario", userRouter)

module.exports = router;