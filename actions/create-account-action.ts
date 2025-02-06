"use server"

import { ErrorResponseSchema, RegisterSchema, SuccessSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[] 
    success: {
        msg: string
    }
}
 //Es un server action, se ejecuta en el lado de servidor y es asincrono (async)

export async function register(prevState : ActionStateType, formData: FormData) {


    //Creamos un objeto con los valores
    const registerData = {
        email: formData.get('email'),
        name: formData.get('name'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    }

    //Validar data con zod
    const register = RegisterSchema.safeParse(registerData)

    //Obtener errores
    if(!register.success) {
        const errors = register.error.errors.map(error => error.message) //Los errores estan en un nuevo array
        return {
            errors,
            success: prevState.success //Retorna el valor vacío que se definio en el useActionState
        }
    }

    //registrar el usuario
    const url = `${process.env.API_URL}/auth/create-account`

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: register.data.name,
            password: register.data.password,
            email: register.data.email
        })
    })

    const json = await req.json()

    if(req.status === 409) {
        const { msg } = ErrorResponseSchema.parse(json)
        return {
            errors: [msg],
            success: {
                msg: ""
            }//prevState.success
        }

    }
    
  
    const success = SuccessSchema.parse(json)

    //Retorno un arreglo vacíom esto manda al useActionState
    return {
        errors: [], //Se puede regresar el state previo: prevState.errors
        success
    }
    
    
}