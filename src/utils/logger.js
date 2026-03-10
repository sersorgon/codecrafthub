/**
 * @file logger.js
 * @description Configuración del sistema de logs usando Winston.
 * Registra eventos de la aplicación en consola y en el archivo error.log.
 *
 * Niveles de log disponibles (de mayor a menor prioridad):
 * error, warn, info, http, verbose, debug, silly
 */

const winston = require('winston');

/**
 * Instancia del logger configurado con dos transportes:
 * - File: guarda los errores en 'error.log'
 * - Console: muestra todos los logs en la consola en formato JSON
 *
 * @type {import('winston').Logger}
 */
const logger = winston.createLogger({
    level: 'info', // Nivel mínimo de log que se procesará
    format: winston.format.json(), // Formato de salida en JSON
    transports: [
        // Escribe solo los errores en el archivo error.log
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // Muestra todos los logs en la consola
        new winston.transports.Console()
    ]
});

module.exports = logger;
