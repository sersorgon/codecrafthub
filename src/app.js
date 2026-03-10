/**
 * @file app.js
 * @description Punto de entrada principal de la aplicación.
 * Carga las variables de entorno, inicializa el servidor Express,
 * establece la conexión con MongoDB, registra las rutas y arranca el servidor.
 *
 * Flujo de arranque:
 * 1. Carga .env con dotenv
 * 2. Inicializa Express con middlewares (CORS, body-parser)
 * 3. Conecta con MongoDB
 * 4. Registra las rutas de la API
 * 5. Registra el middleware global de manejo de errores
 * 6. Arranca el servidor en el puerto configurado
 */

require('dotenv').config(); // Carga las variables de entorno desde .env

const express = require('express');
const connectDB = require('./config/db');       // Función de conexión a MongoDB
const initServer = require('./config/server');  // Función de configuración de Express
const userRoutes = require('./routes/userRoutes'); // Rutas del módulo de usuarios
const errorHandler = require('./utils/errorHandler'); // Middleware global de errores

// Inicializa la app Express con sus middlewares (CORS, bodyParser)
const app = initServer();

// Establece la conexión con la base de datos MongoDB
connectDB();

// Registra las rutas de usuarios bajo el prefijo /api/users
app.use('/api/users', userRoutes);

// Registra el manejador global de errores (debe ir después de todas las rutas)
app.use(errorHandler);

// Puerto del servidor: usa el definido en .env o 5000 por defecto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
