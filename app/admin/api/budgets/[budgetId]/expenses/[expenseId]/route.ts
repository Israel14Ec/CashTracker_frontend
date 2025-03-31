//Archivo para Rest API

import { verifySession } from "@/src/auth/dal"
import { getToken } from "@/src/auth/token"

type ParamsApi = {
    params: Promise< {
        budgetId: string
        expenseId: string
    }>
}

//El primer parametro es un req
export async function GET (request: Request, {params} : ParamsApi) {
    await verifySession()

    const token = await getToken()
    const { budgetId, expenseId } = await params

    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`

    const req = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: "GET"
    })

    const json = await req.json()

    if(!req.ok) {
        return Response.json(json.error, {status: req.status}) //Formatea a json el error
    }

    return Response.json(json) //Response en next lo devuelve en un formato
}