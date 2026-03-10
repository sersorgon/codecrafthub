/**
 * @file userModel.js
 * @description Definición del esquema y modelo de Usuario para MongoDB usando Mongoose.
 * Representa la colección 'users' en la base de datos.
 */

const mongoose = require('mongoose');

/**
 * @typedef {Object} User
 * @property {string} username - Nombre de usuario único (obligatorio)
 * @property {string} email    - Email único del usuario (obligatorio)
 * @property {string} password - Contraseña hasheada del usuario (obligatorio)
 * @property {string} role     - Rol del usuario: 'student', 'instructor' o 'admin'
 * @property {Date}   createdAt - Fecha de creación del registro
 */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,  // Campo obligatorio
        unique: true     // No pueden existir dos usuarios con el mismo username
    },
    email: {
        type: String,
        required: true,  // Campo obligatorio
        unique: true     // No pueden existir dos usuarios con el mismo email
    },
    password: {
        type: String,
        required: true   // Se almacena siempre como hash (bcrypt)
    },
    role: {
        type: String,
        enum: ['student', 'instructor', 'admin'], // Solo se permiten estos valores
        default: 'student'                        // Rol por defecto al registrarse
    },
    createdAt: {
        type: Date,
        default: Date.now // Se asigna automáticamente la fecha actual
    }
});

/**
 * Modelo de Mongoose basado en userSchema.
 * Permite realizar operaciones CRUD sobre la colección 'users'.
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
