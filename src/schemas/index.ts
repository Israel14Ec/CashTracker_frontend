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

export const DraftBudgetSchema = z.object({
  name: z.string()
          .min(1, {message: 'El Nombre del presupuesto es obligatorio'}),
  amount: z.coerce.
          number({message: 'Cantidad no válida'})
          .min(1, {message: 'Cantidad no válida'}),
})

export const PasswordValidationSchema = z.string().min(1, {message: "Ingrese el password"})

export const SuccessSchema = z.object({
  msg: z.string(),
});

export const ErrorResponseSchema = z.object({
  msg: z.string(),
});

export const TokenSchema = z
  .string({ message: "Token no válido" })
  .length(6, { message: "Token no válido" });


export const ForgotPasswordSchema = z.object({
  email: z.string()   
    .min(1, {message: 'El Email es Obligatorio'})
    .email( {message: 'Email no válido'}),
})

export const ResetPasswordSchema = z.object({
  password: z.string()
          .min(8, {message: 'El Password debe ser de al menos 8 caracteres'}),
  password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "Los Passwords no son iguales",
  path: ["password_confirmation"]
});

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

export const ExpenseApiResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  budgetId: z.number()
})


export const BudgetAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  expenses: z.array(ExpenseApiResponseSchema)
})

//Omito el expenses
export const BudgetsApiResponseShema = z.array(BudgetAPIResponseSchema.omit({expenses: true}))

//Generar un type con el schema

export type Budget = z.infer<typeof BudgetAPIResponseSchema>
export type User = z.infer<typeof UserSchema>
export type Expense = z.infer<typeof ExpenseApiResponseSchema>