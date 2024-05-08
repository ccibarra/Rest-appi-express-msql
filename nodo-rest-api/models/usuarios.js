//Importamos los datos de la conexión
import mysql from 'mysql';
//import connection from './connection'; // Suponiendo que tienes el archivo connection.js en el mismo directorio
// const connection = require('./connection'); // CommonJS

const  connection = { 
    host: 'localhost', 
    user: 'root',  
    password: '', 
    database: 'db_clientes',
};

//Creamos la conexión a nuestra base de datos con los datos almacenados en conn
const conn = mysql.createConnection(connection);

//Creamos un objeto al que llamaremos usuarios
var usuarios = {};

//Obtenemos todos los usuarios
usuarios.getUsuarios = function (callback) {
    if (conn) {
        conn.query('SELECT * FROM clientes', function (error, rows) {
            if (error) {
                throw error;
            }
            else {
                callback(null, rows);
            }
        });
    }
}

//Obtenemos un usuario por su id
usuarios.getUsuarioById = function (id, callback) {
    if (conn) {
        var sql = 'SELECT * FROM clientes WHERE id = ' + conn.escape(id);
        conn.query(sql, function (error, row) {
            if (error) {
                throw error;
            }
            else {
                callback(null, row);
            }
        });
    }
}

//Añadir un nuevo usuario
usuarios.insertUsuario = function (usuarioData, callback) {
    if (conn) {
        conn.query('INSERT INTO clientes SET ?', usuarioData, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                //devolvemos el id del usuario insertado
                callback(null, result.insertId);
            }
        });
    }
}

//Actualizar un usuario
usuarios.updateUsuario = function (datosUsuario, callback) {
    if (conn) {
        var sql = 'UPDATE clientes SET nombre = ' + conn.escape(datosUsuario.nombre) + ', telefono = ' + conn.escape(datosUsuario.telefono) + ', cedula = ' + conn.escape(datosUsuario.cedula) + ', empresa = ' + conn.escape(datosUsuario.empresa) + 'WHERE id = ' + datosUsuario.id;

        conn.query(sql, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                callback(null, { "mensaje": "Actualizado" });
            }
        });
    }
}

//Eliminar un usuario por su id
usuarios.deleteUsuario = function (id, callback) {
    if (conn) {
        var sql = 'DELETE FROM clientes WHERE id = ' + conn.escape(id);
        conn.query(sql, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                callback(null, { "mensaje": "Borrado" });
            }
        });
    }
}
export default usuarios;
