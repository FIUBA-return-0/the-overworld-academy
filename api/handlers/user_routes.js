const { Router } = require("express");
const router = Router()
const createUser  = require('../controllers/Users/createUser.js')
const getUser = require("../controllers/Users/getUser.js")
const { validateCreateUser,validateSentCondition } = require("../validations/userValidations.js")
const getAllUsers = require("../controllers/Users/getAllUsers.js")

router.post("/", validateCreateUser,async (req, res) => { 
    const createdRes = await createUser(req.body)

    if (!createdRes.status) {
        res.status(200).json(createdRes)
    } else {
        res.status(400).json(createdRes.error)
    }

})

router.get("/", validateSentCondition,async (req, res) => {
    const { condition } = req.query
    const result = await getAllUsers(condition)
    if (!result.length) {
        res.status(404).json({"error":"no se encontro el/los usuario/s buscado/s"})
    } else {
        res.status(200).json(result)
    }
})

router.get("/:id", async (req, res) => {
    const user = await getUser(req)
    if (!user.length) {
        res.status(404).json({"error":"el usuario no existe"})
    } else {
        res.status(200).json(user)
    }
})

module.exports = router