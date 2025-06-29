const validateCreateUser = (req,res,next) => {
    const { nombre, apellido, id, condicion, carrera, password } = req.body

    if (!nombre || !apellido || !condicion || !password) {
        res.status(400).json({"error":"Algun contenido esta vacio, por favor revisa tus entradas"})
    }

    if (nombre.length > 50 || apellido.length >20) {
        res.status(400).json({ "error": "Nombre o apellido mas largo de lo permitido." })
    }
    if (condicion != "alumno" && condicion != "profesor" && condicion != "director") {
        res.status(400).json({"error":"un usuario solo puede ser alumno, profesor o director"})
    }

    next()
}

module.exports = {validateCreateUser}