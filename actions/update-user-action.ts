"use server"

import { getToken } from "@/src/auth/token"
import { ErrorResponseSchema, SuccessSchema, UserUpdateSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type PrevStateAction = {
    errors: string[],
    success: string
}

export async function updateUser(prevState: PrevStateAction, formData: FormData) {
    
    const userForm = UserUpdateSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email")
    })

    if(!userForm.success) {
        return {
            errors: userForm.error.issues.map(issue => issue.message),
            success: ""
        }
    }

    const url = `${process.env.API_URL}/auth/user`
    const token = await getToken()

    const req = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(userForm.data)
    })

    const json = await req.json()
    
    if(!req.ok) {

        const { msg } = ErrorResponseSchema.parse(json)
        return {
            errors: [msg],
            success: ""
        }
    }
    
    const { msg } = SuccessSchema.parse(json)
    //Revalidar el path
    revalidatePath("/admin")
    redirect("/admin")
    
    return {
        errors: [],
        success: msg
    }
}