const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');


// Habilitar CORS
app.use(cors());
// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',     // Cambia esto si tu base de datos está en un servidor remoto
    user: 'root',
    password: 'password',
    database: 'hotel'
});

// Conexión a la base de datos
connection.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// Ruta de ejemplo que realiza una consulta a la base de datos
app.get('/api/habitaciones', (req, res) => {
    connection.query('SELECT * FROM habitaciones', (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).json({ error: 'Error al obtener los usuarios' });
        } else {
            res.json(results);
        }
    });
});

// Ruta para la inserción del registro
app.post('/api/habitaciones', (req, res) => {
    const reg = req.body;   

    // Consulta SQL para insertar el registro
    const sql = 'INSERT INTO habitaciones (camas_simples,camas_matrimoniales,estado,ejecutiva) VALUES (?,?,?,?)';
  
    // Ejecutar la consulta con los datos
    connection.query(sql, [reg.camas_simples,reg.camas_matrimoniales,reg.estado,reg.ejecutiva], (error, results) => {
      if (error) {
        console.error('Error al insertar el registro:', error);
        res.status(500).json({ error: 'Error al insertar el registro' });
      } else {
        console.log('Registro insertado correctamente');
        res.status(200).json({ message: 'Registro insertado correctamente' });
      }
    });
  });


app.delete('/api/habitaciones/:id', (req, res) => {
    const id = req.params.id;  

    const sql = 'DELETE FROM habitaciones WHERE id=?';
    console.log({id});
    connection.query(sql, id, (error, results) => {
      if (error) {
        console.error('Error al borrar el registro:', error);
        res.status(500).json({ error: 'Error al borrar el registro' });
      } else {
        console.log('Registro borrado correctamente');
        res.status(200).json({ message: 'Registro borrado correctamente' });
      }
    });
  });

// Puerto en el que se ejecutará el servidor
const puerto = 3000;

// Iniciar el servidor
app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
