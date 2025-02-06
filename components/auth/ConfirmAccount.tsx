"use client"

import { startTransition, useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { confirmAccount } from "@/actions/confirm-account-action"

export default function ConfirmAccount() {

    const router = useRouter()
    const [token, setToken] = useState("")

    const confirmAccountWithToken = confirmAccount.bind(null, token)
    const [state, dispatch ] = useActionState(confirmAccountWithToken, {
        errors: [],
        success: {
            msg: ""
        }
    })

    const handleChange = (token: string) => {
        setToken(token)
    }

    useEffect(() => {
        if(token.length === 6) {
            startTransition(() => {
                dispatch()
            })
        }
 
    }, [token])
    
    useEffect(() => {
        if(state.errors) {
            state.errors.forEach(error => {
                toast.error(error)
            })
        }
        if(state.success.msg) {
            toast.success(state.success.msg)
            setTimeout(() => {
                router.push('/auth/login')
            }, 1000);
        }
    }, [state])

  return (
    <>    
        <div className=" flex justify-center gap-5 my-10">
            <PinInput
                value={token}
                onChange={handleChange}
            >
                <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center font-semibold text-gray-600" />
                <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center font-semibold text-gray-600" />
                <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center font-semibold text-gray-600" />
                <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center font-semibold text-gray-600" />
                <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center font-semibold text-gray-600" />
                <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center font-semibold text-gray-600" />
            </PinInput>
        </div>
    </>
  )
}
