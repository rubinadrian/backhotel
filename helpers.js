function stringToDate(fechaYYYYMMDD) {
    const partesFecha = fechaYYYYMMDD.split('-');
    const year = parseInt(partesFecha[0]);
    const month = parseInt(partesFecha[1]) - 1; // Los meses en JavaScript son base 0 (enero es 0)
    const day = parseInt(partesFecha[2]);

    return new Date(year, month, day, 3, 0, 0);
}

function dateToString(fecha) {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0'); // El mes comienza desde 0, por lo que se le suma 1
    const day = String(fecha.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

module.exports = {
    stringToDate,
    dateToString
}