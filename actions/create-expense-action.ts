"use server"

import { getToken } from "@/src/auth/token"
import { DraftExpensesSchema, ErrorResponseSchema, SuccessSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[]
    success: string
}

export default async function createExpense(budgetId: number,prevState: ActionStateType, formData: FormData) {
    

    //Validar
    const expenseData = {
        name: formData.get("name"),
        amount: formData.get("amount")
    }

    const expense = DraftExpensesSchema.safeParse(expenseData)
    console.log(expense)
    if(!expense.success) {
        console.log("entro aqui")
        return {
            errors: expense.error.issues.map(issue => issue.message),
            success: ""
        }
    }

    //Get Token
    const token = await getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses`


    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name: expense.data.name,
            amount: expense.data.amount
        })
    })

    const json = await req.json()

    if(!req.ok) {
        
        const error = ErrorResponseSchema.safeParse(json)
        return {
            errors: [error.data?.msg || "Error al crear el gasto"],
            success: ""
        }
    }

    const { msg } = SuccessSchema.parse(json)
    
    return {
        errors:[],
        success: msg
    }
}