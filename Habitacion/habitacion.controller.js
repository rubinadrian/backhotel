const Habitacion = require("./habitacion.model");

function getAll(req, res) {
    Habitacion.controlOcupadas();

    Habitacion.getAll((error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).json({ error: 'Error al obtener las habitaciones' });
        } else {
            res.json(results);
        }
    });
}

module.exports = {
    getAll
}