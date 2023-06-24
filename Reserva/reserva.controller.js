const Reserva = require("./reserva.model");
const Habitacion = require("../Habitacion/habitacion.model");
const Helpers = require("../helpers");


function getReservasPend(req, res) {
    Reserva.getReservasPend(req.body.habitacion_id)
    .then(([rows,fields]) => res.json(rows))
    .catch((error) => {
        console.error(error);
        res.status(500).json({ error });
    });
}

function getReservasVigentes(req, res) {
    Reserva.getReservasVigentes(req.body.habitacion_id)
        .then(([rows,fields]) => res.json(rows))
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error });
        });
}

function delReserva(req, res) {
    const ids = req.body.map(objeto => objeto.id);
    if(ids.length > 0) {
        Reserva.del(ids)
        .then(()=> {
            Habitacion.controlOcupadas();
            res.json({ok:true});
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error });
        });        
    }
}

function cobrarReservas(req, res) {
    const ids = req.body.map(objeto => objeto.id);
    if(ids.length > 0) {
        Reserva.cobrar(ids)
        .then(()=> {
            Habitacion.controlOcupadas();
            res.json({ok:true});
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error });
        });  
    }
}

function generarReservas(req, res) {
    const fechaDesde = Helpers.stringToDate(req.body.fechaDesde);
    const fechaHasta = Helpers.stringToDate(req.body.fechaHasta);
    const diferenciaEnMilisegundos = Math.abs(fechaDesde - fechaHasta);
    const diferenciaEnDias = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
    if (diferenciaEnDias > 31) {
        res.status(400).json({ message: 'Error, la diferencia entre fechas no puede ser mayor a 31' });
    }

    const reserva = new Reserva(req.body);

    Reserva.getReservasDesdeHasta(Helpers.dateToString(fechaDesde), Helpers.dateToString(fechaHasta), req.body.habitacion_id)
    .then(([rows,fields])=>{
        if(rows.length > 0) {
            res.status(400).json({ message: 'Ya existen reservas en este periodo' });
        } else {
            while (fechaDesde <= fechaHasta) {
                reserva.fecha = Helpers.dateToString(fechaDesde);
                reserva.save()
                        .then()
                        .catch((error) => {
                            console.error(error);
                            res.status(500).json({ error });
                        });
                fechaDesde.setDate(fechaDesde.getDate() + 1);
            }
            Habitacion.controlOcupadas();
            res.json({ok:true});
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ error });
    });  
}


module.exports = {
    generarReservas,
    getReservasPend,
    getReservasVigentes,
    delReserva,
    cobrarReservas
}