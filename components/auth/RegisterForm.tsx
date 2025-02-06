"use client";

import { useActionState, useEffect, useRef } from "react";
import { register } from "@/actions/create-account-action";
import ErrorMessage from "../ui/ErrorMessage";
import SuccessMessage from "../ui/SuccessMesage";

export default function RegisterForm() {
  
  const ref = useRef<HTMLFormElement>(null) 

  //Toma un action, el state contiene lo que devuelve el action, el dispatch llama al action
  const [state, dispatch] = useActionState(register, {
    //Antiguamemnte se llamaba el hook useFormState
    errors: [],
    success: {
      msg: "",
    },
  });

  //Limpia el formulario
  useEffect(() => {
    if(state.success) {
        ref.current?.reset() //Reiniciar el formulario
    }
  }, [state])

  return (
    <form 
      ref={ref}
    className="mt-14 space-y-5" action={dispatch} noValidate>
      {state.errors.map((error, index) => (
        <ErrorMessage key={index}> {error} </ErrorMessage>
      ))}

      {state.success.msg && (
        <SuccessMessage> {state.success.msg} </SuccessMessage>
      )}

      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="email"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl">Nombre</label>
        <input
          type="name"
          placeholder="Nombre de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl">Password</label>
        <input
          type="password"
          placeholder="Password de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="password"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl">Repetir Password</label>
        <input
          id="password_confirmation"
          type="password"
          placeholder="Repite Password de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="password_confirmation"
        />
      </div>

      <input
        type="submit"
        value="Registrarme"
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
      />
    </form>
  );
}
