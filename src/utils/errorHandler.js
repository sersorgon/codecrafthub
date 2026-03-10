/**
 * @file errorHandler.js
 * @description Middleware global de manejo de errores para Express.
 * Captura cualquier error no controlado en la aplicación,
 * lo registra con el logger y devuelve una respuesta JSON genérica al cliente.
 *
 * Debe registrarse como el último middleware en app.js (después de todas las rutas).
 */

const logger = require('./logger');

/**
 * Middleware de manejo de errores con la firma estándar de Express (4 parámetros).
 * Express lo reconoce como handler de errores por la aridad (err, req, res, next).
 *
 * @function errorHandler
 * @param {Error}  err  - El error capturado
 * @param {import('express').Request}  req  - Objeto de petición
 * @param {import('express').Response} res  - Objeto de respuesta
 * @param {import('express').NextFunction} next - Función para pasar al siguiente middleware
 * @returns {void} Responde con HTTP 500 y un mensaje genérico de error
 */
const errorHandler = (err, req, res, next) => {
    // Registra el error completo usando Winston para trazabilidad
    logger.error(err);

    // Responde al cliente con un mensaje genérico (no expone detalles internos)
    res.status(500).json({ error: 'Something went wrong.' });
};

module.exports = errorHandler;
