"use server";

import { getToken } from "@/src/auth/token";
import { Budget, DraftExpensesSchema, ErrorResponseSchema, Expense, SuccessSchema } from "@/src/schemas";

type BudgetAndExpenseId = {
  budgetId: Budget["id"];
  expenseId: Expense["id"];
};

type ActionStateType = {
  errors: string[];
  success: string;
};

export default async function editExpense(
  { budgetId, expenseId } : BudgetAndExpenseId,
  prevState: ActionStateType,
  formData: FormData
) {

    const expense = DraftExpensesSchema.safeParse({
        name: formData.get("name"),
        amount: formData.get("amount"),
    })
    if (!expense.success) {
        return {
            errors: expense.error.errors.map((issue) => issue.message),
            success: "",
        }
    }

    //Actualizar
    const token = await getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`

    const req = await fetch(url, {
        method: "PUT",
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
    console.log(json)
    
    if(!req.ok) {

        const { msg } = ErrorResponseSchema.parse(json)
        return {
            errors: [msg],
            success: "",
        }
    }

    const {msg} = SuccessSchema.parse(json)

  return {
    errors: [],
    success: msg,
  };
}
