import { z } from 'zod';
import { CATEGORIES } from './constants';

const categoryValues = CATEGORIES.map((c) => c.value);

export const loginSchema = z.object({
  email: z.string().email('Ingresá un email válido'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

export const packageSchema = z.object({
  title: z.string().trim().min(1, 'El título es obligatorio'),
  description: z.string().trim().min(1, 'La descripción es obligatoria'),
  destination: z.string().trim().min(1, 'El destino es obligatorio'),
  details: z.string().trim().optional().default(''),
  categories: z
    .array(z.enum(categoryValues))
    .min(1, 'Seleccioná al menos una categoría'),
  images: z
    .array(
      z.object({
        url: z.string().url(),
        publicId: z.string().min(1),
        isCover: z.boolean().optional().default(false),
      })
    )
    .default([]),
  videos: z
    .array(
      z.object({
        url: z.string().url(),
        publicId: z.string().min(1),
      })
    )
    .default([]),
  onRequest: z.boolean().default(true),
  amount: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => (v === '' || v === undefined ? undefined : Number(v))),
  isActive: z.boolean().default(true),
});
