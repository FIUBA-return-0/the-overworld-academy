const validateCreateDegree = (req, res, next) => {

    const { nombre, description, duracion, sede } = req.body

    if (!nombre || !description || !duracion || !sede) {
        return res.status(400).json({"error":"Algun contenido esta vacio, por favor revisa tus entradas"})
    }

    if (nombre.length > 50 || sede.length > 40) {
        return res.status(400).json({ "error": "Nombre o sede mas largo de lo permitido." })
    }
    next()

}

module.exports = validateCreateDegree