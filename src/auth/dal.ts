import { cache } from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { UserSchema } from "../schemas"
//DATA ACCESS LAYER

//COMPROBAR SI EL USUARIO ESTA AUTENTICADO

//Cache guarda en memoria la consulta 

export const verifySession = cache(async () => {

    const authCookie = await cookies()

    const token = authCookie.get('CASHTRACKER_TOKEN')?.value

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