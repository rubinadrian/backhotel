
function routes(app) {
    require('./Habitacion/habitacion.routes')(app);
    require('./Reserva/reserva.routes')(app);
}


module.exports = routes;    