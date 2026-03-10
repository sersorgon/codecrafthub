/**
 * @file userRoutes.js
 * @description Define las rutas HTTP del módulo de usuarios.
 * Todas las rutas están prefijadas con /api/users (definido en app.js).
 *
 * Rutas disponibles:
 * - POST /api/users/register -> Registra un nuevo usuario
 * - POST /api/users/login    -> Inicia sesión y devuelve un token JWT
 */

const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

/**
 * @route  POST /api/users/register
 * @desc   Registra un nuevo usuario con username, email y password
 * @access Público
 */
router.post('/register', registerUser);

/**
 * @route  POST /api/users/login
 * @desc   Autentica al usuario y devuelve un token JWT
 * @access Público
 */
router.post('/login', loginUser);

module.exports = router;
