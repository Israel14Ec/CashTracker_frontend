import "server-only" //Dependencia para que se ejecute solo en el lado del servidor el código
import { cache } from "react"
import { redirect } from "next/navigation"
import { UserSchema } from "../schemas"
import { getToken } from "./token"
//DATA ACCESS LAYER

//COMPROBAR SI EL USUARIO ESTA AUTENTICADO

//Cache guarda en memoria la consulta 

export const verifySession = cache(async () => {

    const token = await getToken()

    if(!token) {
        redirect('/auth/login')
    }
    
    const url = `${process.env.API_URl}/auth/user`
    const req = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })  
    
    const session = await req.json()
    const result = UserSchema.safeParse(session)

    //En caso de no ser valido
    if(!result.success) {
        redirect('/auth/login')
    }

    return {
        user: result.data,
        isAuth: true
    }
    
})