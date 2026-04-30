import { z } from 'zod';

export const updateProfileSchema = z.object({
  username: z.string()
    .min(3, "Mínimo 3 caracteres")
    .max(20, "Máximo 20 caracteres")
    .regex(/^[a-zA-Z0-9_-]+$/, "Solo letras, números, guiones y guiones bajos")
    .optional(),
  avatar_url: z.string()
    .refine(val => val.startsWith('http') || val.startsWith('/uploads/'), {
      message: "El avatar debe ser una URL válida o una ruta de servidor"
    })
    .optional(),
  notification_time: z.string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato de hora inválido (HH:mm)")
    .nullable()
    .optional(),
  light_theme: z.string().optional(),
  dark_theme: z.string().optional(),
});