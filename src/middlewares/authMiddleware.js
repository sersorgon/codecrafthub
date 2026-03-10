/**
 * @file authMiddleware.js
 * @description Middleware de autenticación basado en JWT (JSON Web Token).
 * Protege las rutas que requieren que el usuario esté autenticado.
 * El token debe enviarse en el header Authorization con el formato: Bearer <token>
 */

const jwt = require('jsonwebtoken');

/**
 * Middleware que verifica el token JWT en la cabecera Authorization.
 * Si el token es válido, adjunta el payload del usuario a req.user y llama a next().
 * Si el token es inválido o no existe, devuelve un error 401 o 400.
 *
 * @function authMiddleware
 * @param {import('express').Request}  req  - Objeto de petición (debe incluir header Authorization)
 * @param {import('express').Response} res  - Objeto de respuesta
 * @param {import('express').NextFunction} next - Función para pasar al siguiente middleware
 * @returns {void}
 */
const authMiddleware = (req, res, next) => {
    // Extrae el token del header Authorization (formato: "Bearer <token>")
    const token = req.header('Authorization')?.split(' ')[1];

    // Si no hay token, deniega el acceso
    if (!token) return res.status(401).json({ error: 'Access denied.' });

    try {
        // Verifica y decodifica el token usando la clave secreta
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Adjunta los datos del usuario al objeto req para usarlos en los siguientes middlewares
        req.user = verified;
        next();
    } catch (error) {
        // El token ha expirado o ha sido manipulado
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
