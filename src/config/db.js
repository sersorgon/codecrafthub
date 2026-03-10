/**
 * @file db.js
 * @description Configuración y conexión a la base de datos MongoDB usando Mongoose.
 * Se conecta usando la URI definida en las variables de entorno (MONGO_URI).
 */

const mongoose = require('mongoose');

/**
 * Establece la conexión con MongoDB.
 * Si la conexión falla, imprime el error y termina el proceso con código 1.
 *
 * @async
 * @function connectDB
 * @returns {Promise<void>}
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,       // Usa el nuevo parser de URL de MongoDB
            useUnifiedTopology: true     // Usa el nuevo motor de gestión de conexiones
        });
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Termina el proceso si no se puede conectar
    }
};

module.exports = connectDB;
