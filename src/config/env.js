/**
 * @file env.js
 * @description Carga las variables de entorno desde el archivo .env
 * usando el paquete dotenv. Debe importarse al inicio de la aplicación
 * antes de acceder a cualquier variable de process.env.
 *
 * Variables de entorno esperadas:
 * - MONGO_URI: URI de conexión a MongoDB
 * - PORT: Puerto en el que escucha el servidor (por defecto 5000)
 * - JWT_SECRET: Clave secreta para firmar los tokens JWT
 */

require('dotenv').config();
