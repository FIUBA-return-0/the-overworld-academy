
/**
 * realiza validaciones sobre un body vacio, faltante en un contenido o campo con longitud mayor a la permitida
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns undefined. Error 400 en caso de incumplir
 */
const validateDegreeValues = (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ error: "No se recibió body en la solicitud" });
    }

    const { nombre, sede, duracion, foto } = req.body;

    if(duracion !== undefined && (duracion <= 0 || isNaN(duracion))){
        return res.status(400).json({error: 'La duración debe ser un número mayor que 0'})
    }

    if ((nombre && nombre.length > 50) || (sede && sede.length > 40)) {
        return res.status(400).json({ error: "Nombre o sede más largo de lo permitido." });
    }
    if(foto){
        try{
            new URL(foto)
        } catch(error) {
            return res.status(404).json({ error: "Debe enviar una URL de foto válida"})
        }
    }

    next();
};

const validateEmptyEntriesD = (req, res, next) => {
    const { nombre, description, duracion, sede } = req.body;

    if (!nombre || !description || !duracion || !sede) {
        return res.status(400).json({ error: "Algún contenido está vacío, por favor revisa tus entradas" });
    }
    next()
}

module.exports = {validateDegreeValues,validateEmptyEntriesD}