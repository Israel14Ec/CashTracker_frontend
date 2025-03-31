"use server";

import { getToken } from "@/src/auth/token";
import { Budget, ErrorResponseSchema, Expense, SuccessSchema } from "@/src/schemas";

type BudgetAndExpense = {
  budgetId: Budget["id"];
  expenseId: Expense["id"];
};

type ActionStateType = {
  errors: string[];
  success: string;
};

export default async function deleteExpense(
  { budgetId, expenseId }: BudgetAndExpense,
  prevState: ActionStateType
) {

    const token = await getToken()

   const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
   const req = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
   })

   const json = await req.json()

   if(!req.ok) {
    const { msg } = ErrorResponseSchema.parse(json)
    return {
      errors: [msg],
      success: "",
    }
   }

   const { msg } = SuccessSchema.parse(json)

  return {
    errors: [],
    success: msg,
  };
}
