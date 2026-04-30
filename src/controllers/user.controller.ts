import type { Request, Response } from 'express';
import { User } from '../models/index.ts';
import { updateProfileSchema } from '../schemas/user.schema.ts';

export const checkUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    if (!username || username.length < 3) return res.status(200).json({ available: false });


    // MariaDB con collation _ci (case insensitive)
    const existing = await User.findOne({ where: { username } });

    return res.json({
      available: !existing
    });

  } catch (error) {
    console.log("Error en checkUsername:", error);


    return res.status(500).json({
      error: 'Error al comprobar usuario'
    });
  }
};

// Actualizar perfil
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const validatedData = updateProfileSchema.parse(req.body);

    await user.update(validatedData);

    return res.json({
      message: 'Perfil actualizado con éxito',
      user
    });

  } catch (error: any) {

    console.log("Error en updateProfile:", error);

    return res.status(400).json({
      message: 'Datos inválidos',
      errors: error.errors
    });
  }
};