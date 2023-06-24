
const cors = require('cors');
const puerto = 3000;

function configure(app,express) {
    // Habilitar CORS
    app.use(cors());
    // Middleware para analizar el cuerpo de la solicitud como JSON
    app.use(express.json());
    // Middleware para analizar el cuerpo de la solicitud como URL codificada
    app.use(express.urlencoded({ extended: true }));
}

function start(app) {
    // Iniciar el servidor
    app.listen(puerto, () => {
        console.log(`Servidor corriendo en http://localhost:${puerto}`);
    });
}

module.exports = {
    configure,
    start
};