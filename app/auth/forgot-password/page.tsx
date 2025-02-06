import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata : Metadata = {
  title: 'CashTracker - Recuperar contraseña',
  description: 'Recuperación de contraseña'
}

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className=" font-black text-6xl text-purple-950">¿Olvidaste tu contraseña?</h1>
      <p className=" text-3xl font-bold">
        aqui puedes <span className=" text-amber-500">reestablecerla</span>
      </p>

      <ForgotPasswordForm />

      
      <nav className=" mt-10 flex flex-col space-y-2">
        <Link href={'/auth/register'}
          className=" text-center text-gray-500 hover:text-gray-600"
        >
          ¿No tienes cuenta? Crea una
        </Link>

        <Link href={'/auth/login'}
          className=" text-center text-gray-500 hover:text-gray-600"
        >
          ¿Tienes cuenta? Inicia sesión
        </Link>
      </nav>

    </>
  );
}
