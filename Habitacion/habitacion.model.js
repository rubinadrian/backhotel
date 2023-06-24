const connection = require("../basededatos");

class Habitacion {

    static EstadoHabitacion = {
        Libre:0,
        Ocupada:1,
        Mantenimiento:2
    };

    constructor(habitacion) {
        this.id = habitacion.id;
        this.estado = habitacion.estado;
        this.tipo_habitacion_id = habitacion.tipo_habitacion_id;
    };

    static getAll(callback){
        connection.query(`
                SELECT
                    a.id,
                    b.camas_simples,
                    b.camas_matrimoniales,
                    a.estado,
                    b.ejecutiva,
                    b.nombre,
                    b.importe
                FROM
                    habitaciones a
                INNER JOIN habitaciones_tipos b on (a.tipo_habitacion_id = b.id)
                ORDER BY a.id`, callback);
    }
    
    // Control de habitaciones ocupadas.
    static controlOcupadas() {

        // Seteamos las habitaciones ocupadas. (Manteniemto no se toca)
        connection.query(`UPDATE habitaciones SET estado = ${this.EstadoHabitacion.Ocupada} where id in (
            SELECT habitacion_id FROM reservas where fecha = CURDATE())
            AND estado not in (${this.EstadoHabitacion.Ocupada},${this.EstadoHabitacion.Mantenimiento})`);

        // Seteamos las habitaciones libres. (Manteniemto no se toca)
        connection.query(`UPDATE habitaciones SET estado = ${this.EstadoHabitacion.Libre} where id  not in (
                SELECT habitacion_id FROM reservas where fecha = CURDATE())
                AND estado not in (${this.EstadoHabitacion.Libre},${this.EstadoHabitacion.Mantenimiento})`);
    }

}

module.exports = Habitacion;