
const habitacionController = require('./habitacion.controller');

function routes(app) {
    app.get('/api/habitaciones',habitacionController.getAll);
}


module.exports = routes;