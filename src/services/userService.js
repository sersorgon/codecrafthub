/**
 * @file userService.js
 * @description Capa de servicio para operaciones relacionadas con usuarios.
 * Abstrae la lógica de acceso a datos del modelo User,
 * facilitando la reutilización y los tests unitarios.
 */

const User = require('../models/userModel');

/**
 * Busca un usuario en la base de datos por su ID.
 *
 * @async
 * @function findUserById
 * @param {string} userId - El ID de MongoDB del usuario a buscar
 * @returns {Promise<User|null>} El documento del usuario si existe, o null si no se encuentra
 */
exports.findUserById = async (userId) => {
    return await User.findById(userId);
};
