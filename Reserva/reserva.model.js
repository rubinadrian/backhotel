const connection = require("../basededatos");


class Reserva {

    Estado = {
        Pendiente: 0,
        Facturada: 1,
        Cobrada: 2
    };

    constructor(reserva) {
        this.id = reserva.id;
        this.fecha = reserva.fecha;
        this.huesped = reserva.huesped;
        this.habitacion_id = reserva.habitacion_id;
        this.importe = reserva.importe;
        this.estado = reserva.estado;
        this.descuento = reserva.descuento;
    }


    save(callback) {
        connection.query(`INSERT INTO reservas (fecha,huesped, habitacion_id, importe) VALUES (?,?,?,?)`,
            [this.fecha, this.huesped, this.habitacion_id, this.importe]
            , callback);
    }

    del(ids, callback) {
        connection.query(`DELETE FROM reservas WHERE id in (?)`, [ids], callback);
    }


    cobrar(ids, callback) {
        connection.query(`UPDATE reservas SET estado = ${this.Estado.Cobrada} WHERE id in (?)`, [ids], callback);
    }

    getReservasDesdeHasta(fechaDesde, fechaHasta, callback) {
        console.log(fechaDesde, fechaHasta);
        connection.query(`SELECT * FROM reservas WHERE 
        FECHA BETWEEN ? AND ? 
        and habitacion_id = ${this.habitacion_id}`,
            [fechaDesde, fechaHasta]
            , callback);
    }

    getReservasPend(callback) {
        connection.query(`SELECT * FROM reservas WHERE 
        estado <> ${this.Estado.Cobrada} 
        and habitacion_id = ${this.habitacion_id}`, [], callback);
    }

    getReservasVigentes(callback) {
        connection.query(`SELECT * FROM reservas WHERE 
        (estado <> ${this.Estado.Cobrada} or fecha >= CURDATE()) 
        and habitacion_id = ${this.habitacion_id}`, [], callback);
    }
}

module.exports = Reserva;