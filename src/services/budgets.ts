import { cache } from "react"; //Utiliza el cache para evitar hacer dos veces la consulta

import { notFound } from "next/navigation";
import { getToken } from "../auth/token";
import { Budget, BudgetAPIResponseSchema } from "../schemas";

export const getBudgetById = cache(async (budgetId: Budget["id"]) => {
    const token = await getToken();
    const url = `${process.env.API_URL}/budgets/${budgetId}`;
  
    const req = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const json = await req.json();
  
    if (!req.ok) {
      notFound();
    }
  
    const budget = BudgetAPIResponseSchema.safeParse(json);
    if (budget.success) return budget.data;
  });
  