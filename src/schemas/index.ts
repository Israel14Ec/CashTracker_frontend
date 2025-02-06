import { z } from "zod";

//Validacion del formulario de registro
export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Ingrese el email" })
      .email({ message: "Email no válido" }),
    name: z
      .string({ message: "Ingrese el nombre" })
      .min(1, { message: "Ingrese un nombre" }),
    password: z
      .string({ message: "Ingrese el password" })
      .min(8, { message: "El password es muy corto, mínimo 8 caracteres" }),
    password_confirmation: z.string({ message: "Ingrese la confirmación" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    //Refine Compara los passwords
    message: "Los passwords no sn iguales",
    path: ["password_confirmation"], //En donde se coloca el error
  });

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El Email es Obligatorio" })
    .email({ message: "Email no válido" }),
  password: z.string().min(1, { message: "El Password no puede ir vacio" }),
});

export const SuccessSchema = z.object({
  msg: z.string(),
});

export const ErrorResponseSchema = z.object({
  msg: z.string(),
});

export const TokenSchema = z
  .string({ message: "Token no válido" })
  .length(6, { message: "Token no válido" });

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});
