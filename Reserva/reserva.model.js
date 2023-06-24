const connection = require("../basededatos");


class Reserva {

    static Estado = {
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
        this.estado_id = reserva.estado_id;
        this.descuento = reserva.descuento;
    }


    save() {
        return connection.promise().query(`
            INSERT INTO reservas (fecha,huesped, habitacion_id, importe) 
            VALUES (?,?,?,?)`,
            [this.fecha, this.huesped, this.habitacion_id, this.importe]
            );
    }

    static del(ids) {
        return connection.promise().query(`DELETE FROM reservas WHERE id in (?)`, [ids]);
    }

    static cobrar(ids) {
        return connection.promise().query(`
            UPDATE reservas 
            SET estado_id = ${Reserva.Estado.Cobrada} 
            WHERE id in (?)`, [ids]);
    }

    static getReservasDesdeHasta(fechaDesde, fechaHasta, habitacion_id) {
        return connection.promise().query(`
            SELECT * FROM reservas 
            WHERE 
                fecha BETWEEN ? AND ? 
            AND habitacion_id = ${habitacion_id}`,
            [fechaDesde, fechaHasta]);
    }

    static getReservasPend(habitacion_id) {
        return connection.promise().query(`
            SELECT * FROM reservas 
            WHERE 
                estado_id <> ${this.Estado.Cobrada} 
            AND habitacion_id = ${habitacion_id}`);
    }

    // Reservas desde hoy en adelante mas las pendiente de cobro
    static getReservasVigentes(habitacion_id) {
        return connection.promise().query(`
            SELECT reservas.*, reservas_estados.estado 
            FROM reservas 
            LEFT JOIN reservas_estados on (reservas_estados.id = reservas.estado_id) 
            WHERE 
                (fecha >= CURDATE() or estado_id <> ${Reserva.Estado.Cobrada})
            AND habitacion_id = ${habitacion_id}`);
    }
}

module.exports = Reserva;