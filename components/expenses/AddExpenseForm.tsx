"use client"

import { useActionState, useEffect } from "react";
import createExpense from "@/actions/create-expense-action";
import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

type AddExpenseFormProps  = {
  closeModal: () => void
}

export default function AddExpenseForm({closeModal} : AddExpenseFormProps) {

  const { budgetId } = useParams()

  const createExpenseWithBudgetId = createExpense.bind(null, +budgetId!)
  const [state, dispatch] = useActionState(createExpenseWithBudgetId, {
    errors: [],
    success: ""
  })

  useEffect(() => {
    console.log(state)
    if(state.success) {
      toast.success(state.success)
      closeModal()
      return
    } 
    if(state.errors.length) {
      toast.error(state.errors[0])
      return
    }

  }, [state])

  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-purple-950 my-5"
      >
        Agregar Gasto
      </DialogTitle>

      <p className="text-xl font-bold">Llena el formulario y crea un {''}
        <span className="text-amber-500">gasto</span>
      </p>
      <form
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        action={dispatch}
        noValidate
      >
        <ExpenseForm/>
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value='Registrar Gasto'
        />
      </form>
    </>
  )
}