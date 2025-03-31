import { useParams, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { DraftExpense } from "@/src/schemas";
import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import editExpense from "@/actions/edit-expense-action";
import ErrorMessage from "../ui/ErrorMessage";
import { toast } from "react-toastify";

export default function EditExpenseForm({ closeModal }: { closeModal: () => void }) {

  const [expense, setExpense] = useState<DraftExpense>()
  const {budgetId} = useParams()

  const searchParams = useSearchParams()
  const expenseId = searchParams.get("editExpenseId")!

  const eidtExpenseWithBudgetId = editExpense.bind(null, {
    budgetId: +budgetId!,
    expenseId: +expenseId!
  })
  const [ state, dispatch ] = useActionState(eidtExpenseWithBudgetId, {
    errors: [],
    success: ""
  })

  useEffect(() => {

    if(state.success) {
      toast.success(state.success)
      closeModal()
      return
    }

  }, [state])

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/budgets/${budgetId}/expenses/${expenseId}`
    fetch(url)
      .then(res => res.json()) // Convertir la respuesta a JSON
      .then(data => setExpense(data)). //Datos
      catch(error => {
        console.error('Error al obtener los datos:', error);
      })
  }, [])

  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-purple-950 my-5"
      >
        Editar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">Edita los detalles de un {''}
        <span className="text-amber-500">gasto</span>
      </p>
      { state.errors.map((error, index) => <ErrorMessage key={index}> {error} </ErrorMessage>)}
      <form
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        action={dispatch}
        noValidate
      >

        <ExpenseForm 
          expense={expense}
        />

        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value='Guardar Cambios'
        />
      </form>
    </>
  )
}