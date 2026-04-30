import type { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { User } from '../models/index.ts';
import { generateTokens, verifyToken } from '../utils/jwt.ts';

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;
    const googleUser = await AuthService.verifyGoogleToken(idToken);

    if (!googleUser) return res.status(401).json({ message: 'Token de Google inválido' });

    const [user, created] = await User.findOrCreate({
      where: { google_id: googleUser.uid },
      defaults: {
        email: googleUser.email,
        username: googleUser.name,
      }
    });

    const tokens = generateTokens(user);

    // GUARDAMOS EL REFRESH TOKEN EN LA DB
    await user.update({ refresh_token: tokens.refreshToken });

    return res.json({ user, ...tokens, isNewUser: created });

  } catch (error) {
    console.log("Error en googleLogin:", error);

    return res.status(500).json({
      error: 'Error en login'
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(400).json({ message: 'Refresh token requerido' });

  try {
    const decoded: any = verifyToken(refreshToken, 'refresh');
    const user = await User.findByPk(decoded.id);

    // Verificamos que el token coincida con el de la DB
    if (!user || user.get('refresh_token') !== refreshToken) {
      return res.status(403).json({ message: 'Refresh token no válido o revocado' });
    }

    const tokens = generateTokens(user);
    await user.update({ refresh_token: tokens.refreshToken });

    return res.json({ ...tokens });

  } catch (error) {
    console.log("Error en refreshToken:", error);

    return res.status(403).json({
      error: 'Token expirado'
    });
  }
};

export const logout = async (req: Request, res: Response) => {

  const { id } = (req as any).user; // Vendrá del middleware isAuth

  await User.update({ refresh_token: null }, { where: { id } });

  return res.json({
    message: 'Sesión cerrada'
  });

};