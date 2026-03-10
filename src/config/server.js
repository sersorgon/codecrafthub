/**
 * @file server.js
 * @description Inicialización y configuración del servidor Express.
 * Aplica middlewares globales: CORS para permitir peticiones cruzadas
 * y body-parser para parsear el cuerpo de las peticiones JSON.
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

/**
 * Crea y configura una instancia de la aplicación Express.
 * Aplica los middlewares necesarios antes de registrar las rutas.
 *
 * @function initServer
 * @returns {import('express').Application} Instancia configurada de Express
 */
const initServer = () => {
    const app = express();

    // Habilita CORS para aceptar peticiones desde otros orígenes (Cross-Origin Resource Sharing)
    app.use(cors());

    // Parsea el cuerpo de las peticiones con formato JSON
    app.use(bodyParser.json());

    return app;
};

module.exports = initServer;
