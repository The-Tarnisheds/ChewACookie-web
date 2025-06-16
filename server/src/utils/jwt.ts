import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'claveSecretaPorDefecto';

export function generarToken(payload: object) {
  return jwt.sign(payload, secret, {
    expiresIn: '1h', // el token dura 1 hora
    issuer: 'chewacookie', // nombre de tu app
  });
}