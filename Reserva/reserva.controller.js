const Reserva = require("./reserva.model");
const Habitacion = require("../Habitacion/habitacion.model");
const Helpers = require("../helpers");


function getReservasPend(req, res) {
    const reserva = new Reserva(req.body);
    reserva.getReservasPend((error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).json({ error: 'Error al insertart las reservas' });
        }
        res.json(results);
    });
}

function getReservasVigentes(req, res) {
    const reserva = new Reserva(req.body);
    reserva.getReservasVigentes((error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).json({ error: 'Error al insertart las reservas' });
        }
        res.json(results);
    });
}

function delReserva(req, res) {

    const reserva = new Reserva({id:0});
    const ids = req.body.map(objeto => objeto.id);
    if(ids.length > 0) {
        reserva.del(ids, (error, result)=>{
            if(error) {
                res.status(500).json({ error: 'Error al intentar borrar reservas' });
            }else {
                Habitacion.controlOcupadas();
                res.json({ok:true});
            }
        });
    }
}


function cobrarReservas(req, res) {
    const reserva = new Reserva({id:0});
    const ids = req.body.map(objeto => objeto.id);
    if(ids.length > 0) {
        reserva.cobrar(ids, (error, result)=>{
            if(error) {
                res.status(500).json({ error: 'Error al intentar cobrar reservas' });
            }else {
                Habitacion.controlOcupadas();
                res.json({ok:true});
            }
        });
    }
}

function generarReservas(req, res) {
    const fechaDesde = Helpers.stringToDate(req.body.fechaDesde);
    const fechaHasta = Helpers.stringToDate(req.body.fechaHasta);
    const diferenciaEnMilisegundos = Math.abs(fechaDesde - fechaHasta);
    const diferenciaEnDias = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
    if (diferenciaEnDias > 31) {
        res.status(400).json({ error: 'Error, la diferencia entre fechas no puede ser mayor a 31' });
    }

    const reserva = new Reserva(req.body);

    reserva.getReservasDesdeHasta(Helpers.dateToString(fechaDesde), Helpers.dateToString(fechaHasta),(error, results)=>{
        if(results.length > 0) {
            const error = new Error('Ya existen reservas en este periodo');
            error.statusCode = 400; 
            res.status(error.statusCode).json({ error: error.message });
        } else {
            
            while (fechaDesde <= fechaHasta) {
                reserva.fecha = Helpers.dateToString(fechaDesde);
                reserva.save((error, results) => {
                    if (error) {
                        console.error('Error al ejecutar la consulta:', error);
                        res.status(500).json({ error: 'Error al insertart las reservas' });
                    }
                });
                fechaDesde.setDate(fechaDesde.getDate() + 1);
            }
            Habitacion.controlOcupadas();
            res.json({ok:true});
        }
    });

}


module.exports = {
    generarReservas,
    getReservasPend,
    getReservasVigentes,
    delReserva,
    cobrarReservas
}