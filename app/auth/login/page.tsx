
import type { Metadata } from "next";
import Link from "next/link";

import LoginForm from "@/components/auth/LoginForm";

export const metadata : Metadata = {
  title: 'CashTracker - Iniciar sesión',
  description: 'Ingresar correo y contraseña'
}

export default function LoginPage() {
  return (
    <>
      <h1 className=" font-black text-6xl text-purple-950">Iniciar sesión</h1>
      <p className=" text-3xl font-bold">
        y controla tus <span className=" text-amber-500">finanzas</span>
      </p>
        <LoginForm />

        <nav className=" mt-10 flex flex-col space-y-2">
        <Link href={'/auth/register'}
          className=" text-center text-gray-500 hover:text-gray-600"
        >
          No tienes cuenta? Crea una
        </Link>

        <Link href={'/auth/forgot-password'}
          className=" text-center text-gray-500 hover:text-gray-600"
        >
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  );
}
