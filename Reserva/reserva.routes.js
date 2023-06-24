
const reservaController = require('./reserva.controller');

function routes(app) {
    app.post('/api/reservas/generar',reservaController.generarReservas);
    app.post('/api/reservas/cobrar',reservaController.cobrarReservas);
    app.post('/api/reservas/pendientes',reservaController.getReservasPend);
    app.post('/api/reservas/vigentes',reservaController.getReservasVigentes);
    app.delete('/api/reservas/delete',reservaController.delReserva);
}


module.exports = routes;