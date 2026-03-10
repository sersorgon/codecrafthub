/**
 * @file userController.js
 * @description Controlador de usuarios. Contiene la lógica de negocio
 * para el registro e inicio de sesión de usuarios.
 * Usa bcrypt para el hash de contraseñas y JWT para la autenticación.
 */

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Registra un nuevo usuario en la base de datos.
 * Hashea la contraseña antes de guardarla.
 *
 * @async
 * @function registerUser
 * @param {import('express').Request}  req - Objeto de petición. Body: { username, email, password }
 * @param {import('express').Response} res - Objeto de respuesta
 * @returns {Promise<void>} 201 con mensaje de éxito o 500 si falla el registro
 */
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Genera un hash seguro de la contraseña con 10 rondas de sal
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea el nuevo usuario con la contraseña hasheada
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        // Puede fallar si el email o username ya existen (unique constraint)
        res.status(500).json({ error: 'Registration failed.' });
    }
};

/**
 * Inicia sesión de un usuario existente.
 * Verifica credenciales y devuelve un token JWT si son correctas.
 *
 * @async
 * @function loginUser
 * @param {import('express').Request}  req - Objeto de petición. Body: { email, password }
 * @param {import('express').Response} res - Objeto de respuesta
 * @returns {Promise<void>} 200 con token JWT, 404 si no existe el usuario, 401 si la contraseña es incorrecta
 */
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Busca el usuario por email en la base de datos
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found.' });

        // Compara la contraseña enviada con el hash almacenado
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials.' });

        // Genera un token JWT con el ID del usuario, válido por 1 hora
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed.' });
    }
};
