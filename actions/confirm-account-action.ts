"use server";

import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: {
    msg: string;
  };
};

export async function confirmAccount(
  token: string,
  prevState: ActionStateType
) {
  const confirmToken = TokenSchema.safeParse(token);
  console.log(prevState)

  if (!confirmToken.success) {
    return {
      errors: confirmToken.error.issues.map((issue) => issue.message),
      success: {
        msg: "",
      },
    };
  }

  //Confirmar el usuario
  const url = `${process.env.API_URL}/auth/confirm-account`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  });

  const json = await req.json()

  if(!req.ok) {
    const { msg } = ErrorResponseSchema.parse(json)
    return {
        errors: [msg],
        success: {
            msg: "",
        },
    }
  }

  const success = SuccessSchema.parse(json)


  return {
    errors: [],
    success: {
      msg: success.msg,
    },
  };
}
