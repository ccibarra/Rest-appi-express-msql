//Importamos express
import express from 'express';
//Creamos el objeto para definir las rutas
import { Router } from 'express';
const router = Router();
//Importamos el modelo que ejecutará las sentencias SQL
import usuariosModel from '../models/usuarios.js';

//Coger todos los usuarios
router.get('/clientes', function (request, response) {

    usuariosModel.getUsuarios(function (error, data) {
        response.status(200).json(data);
    });
});

//Coger usuario por id
router.get('/clientes/:id', function (request, response) {

    var id = request.params.id; // Obtener el ID de la URL
    usuariosModel.getUsuarioById(id, function (error, datos) {

        if (datos.length > 0) {
            response.status(200).json(datos);
        }else {
            response.status(404).json({ "Mensaje": "No existe" });
        }
    });
});


router.post('/clientes', function (request, response) {
    var datosUsuario = {
        id: null,
        nombre: request.body.nombre,
        telefono: request.body.telefono,
        cedula: request.body.cedula,
        empresa: request.body.empresa
    };
    usuariosModel.insertUsuario(datosUsuario, function (error, datos) {
        if (datos) {
            response.status(200).json({ "Mensaje": "Insertado" });
        }
        else {
            response.status(500).json({ "Mensaje": "Error" });
        }
    });
});

//Modificar un usuario
router.put('/clientes/:id', function (request, response) {
    var id = request.params.id; // Obtener el ID de la URL
    var datosUsuario = {
        id: id, // Utilizar el ID obtenido de la URL
        nombre: request.body.nombre,
        telefono: request.body.telefono,
        cedula: request.body.cedula,
        empresa: request.body.empresa
    };


    usuariosModel.updateUsuario(datosUsuario, function (error, datos) {
        //si el usuario se ha actualizado correctamente mostramos un mensaje
        if (datos && datos.mensaje) {
            response.status(200).json(datos);
        }
        else {
            response.status(500).json({ "mensaje": "Error" });

        }
    });
});

//Borrar un usuario
router.delete('/clientes/:id', function (request, response) {

    var id = request.params.id; // Obtener el ID de la URL
    usuariosModel.deleteUsuario(id, function (error, datos) {
        if (datos && datos.mensaje === "Borrado") {
            response.status(200).json(datos);
        }
        else {
            response.status(500).json({ "mensaje": "Error" });
        }
    });
});


export default router;