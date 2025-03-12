"use server";

import { getToken } from "@/src/auth/token";
import {
    Budget,
    ErrorResponseSchema,
    PasswordValidationSchema,
    SuccessSchema,
} from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function deleteBudget(
  budgetId: Budget["id"],
  prevState: ActionStateType,
  formData: FormData
) {
  const currentPassword = PasswordValidationSchema.safeParse(
    formData.get("password")
  );

  if (!currentPassword.success) {
    return {
      errors: currentPassword.error.issues.map((issue) => issue.message),
      success: ""
    };
  }

  //Comprobar password
  const token = await getToken();

  const checkPasswordUrl = `${process.env.API_URL}/auth/check-password`;
  const checkPasswordReq = await fetch(checkPasswordUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      password: currentPassword.data,
      success: "",
    }),
  });

  const checkPaswordJson = await checkPasswordReq.json();

  if (!checkPasswordReq.ok) {
    const { msg } = ErrorResponseSchema.parse(checkPaswordJson);
    return {
      errors: [msg],
      success: "",
    };
  }

  //Eliminar presupuesto
  const deleteBudgetUrl = `${process.env.API_URL}/budgets/${budgetId}`;

  const deleteBudgetReq = await fetch(deleteBudgetUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const deleteBudgetJson = await deleteBudgetReq.json();

  if (!deleteBudgetReq.ok) {
    const { msg } = ErrorResponseSchema.parse(deleteBudgetJson);
    return {
      errors: [msg],
      success: "",
    };
  }

  revalidatePath("/admin")
  const { msg } = SuccessSchema.parse(deleteBudgetJson);
  console.log(msg)

  return {
    errors: [],
    success: msg,
  };
}
