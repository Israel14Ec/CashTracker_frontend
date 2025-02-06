"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ErrorResponseSchema, LoginSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[]
}

export async function authenticate(prevState : ActionStateType, formData: FormData) {

    const loginCredentials = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    const auth = LoginSchema.safeParse(loginCredentials)

    if(!auth.success) {
        return {
            errors: auth.error.errors.map(issue => issue.message) //Devuelvo los errores
        }
    }

    const url = `${process.env.API_URL}/auth/login`
    const req = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: auth.data.password,
            email: auth.data.email
        })
    })

    const json = await req.json()

    //req.ok devuelve true si la respuesta fue exitosa
    if(!req.ok) {

        const { msg } = ErrorResponseSchema.parse(json)
        return {
            errors: [msg]
        }
    }

    //Guardar el JWT en las cookies - En server action
    const authCookie = await cookies();

    authCookie.set({
        name: "CASHTRACKER_TOKEN",
        value: json,
        httpOnly: true, //Únicamente el código del servidor puede acceder a la cookie
        path: '/' //Codigo que sera válido solo en las URL que se definan
        
    })

    redirect('/admin') //Lleva a otra página
}