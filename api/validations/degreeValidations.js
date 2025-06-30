const validateCreateDegree = (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ error: "No se recibió body en la solicitud" });
    }

    const { nombre, description, duracion, sede } = req.body;

    if (!nombre || !description || !duracion || !sede) {
        return res.status(400).json({ error: "Algún contenido está vacío, por favor revisa tus entradas" });
    }

    if (nombre.length > 50 || sede.length > 40) {
        return res.status(400).json({ error: "Nombre o sede más largo de lo permitido." });
    }

    next();
};

module.exports = validateCreateDegree