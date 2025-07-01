const { Router } = require("express");
const router = Router()
const createUser  = require('../controllers/Users/createUser.js')
const getUser = require("../controllers/Users/getUser.js")
const { validateCreateUser,validateSentCondition } = require("../validations/userValidations.js")
const getAllUsers = require("../controllers/Users/getAllUsers.js")

router.post("/", validateCreateUser, async (req, res) => { 
    
    const createdRes = await createUser(req.body)
    let status = !createdRes.status ? 201 : 500
    res.status(status).json(createdRes.content)
})

router.get("/", validateSentCondition,async (req, res) => {
    const { rol } = req.query
    const result = await getAllUsers(rol)
    
    if (!result.length) {
        res.status(404).json({"error":"no se encontro el/los usuario/s buscado/s"})
    } else {
        res.status(200).json(result)
    }
})

router.get("/:id", async (req, res) => {
    const user = await getUser(req)
    
    if (!user) {
        res.status(404).json({"error":"el usuario no existe"})
    } else {
        res.status(200).json(user)
    }
})

module.exports = router