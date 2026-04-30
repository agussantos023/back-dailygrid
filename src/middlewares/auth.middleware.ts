import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.ts';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No autorizado' });

  try {
    const decoded = verifyToken(token, 'access');
    req.user = decoded; // Inyectamos los datos del usuario en la petición

    next();

  } catch (error) {
    return res.status(403).json({
      message: 'Token inválido o expirado'
    });
  }
};