import AddExpenseButton from "@/components/expenses/AddExpenseButton";
import ExpenseMenu from "@/components/expenses/ExpenseMenu";
import ModalContainer from "@/components/ui/ModalContainer";
import { getBudgetById } from "@/src/services/budgets";
import { formatCurrency, formatDate } from "@/src/utils";
import { Metadata } from "next";

type BudgetDetailsPageProps = {
  params: Promise<{
    budgetId: string;
  }>;
};

//Metadata dinámica
export async function generateMetadata({
  params,
}: BudgetDetailsPageProps): Promise<Metadata> {
  const { budgetId } = await params;
  const budget = await getBudgetById(+budgetId!);
  return {
    title: `CashTracker - ${budget?.name}`,
    description: `Presupuesto para ${budget?.name}`,
  };
}

export default async function BudgetDetailsPage({
  params,
}: BudgetDetailsPageProps) {
  const { budgetId } = await params;

  const budget = await getBudgetById(+budgetId!);

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-black text-4xl text-purple-950">
            {budget?.name}
          </h1>
          <p className="text-xl font-bold">
            Administra tus {""} <span className="text-amber-500">gastos</span>
          </p>
        </div>
        <AddExpenseButton />
      </div>

      {budget?.expenses.length ? (
        <>
          <h1 className=" text-3xl text-purple-950 mt-10">
            Gastos en este presupuesto
          </h1>
          <ul
            role="list"
            className="divide-y divide-gray-300 border shadow-lg mt-10 "
          >
            {budget.expenses.map((expense) => (
              <li key={expense.id} className="flex justify-between gap-x-6 p-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-2xl font-semibold text-gray-900">
                      {expense.name}
                    </p>
                    <p className="text-xl font-bold text-amber-500">
                      {formatCurrency(+expense.amount)}
                    
                    </p>
                    <p className="text-gray-500  text-sm">
                      Agregado: {" "}
                      <span className=" font-bold"> {formatDate(expense.updatedAt)} </span>
                    </p>
                  </div>
                </div>

                <ExpenseMenu 
                  expenseId={expense.id}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className=" text-center text-lg text-purple-950 font-semibold">
          No hay gastos aún
        </p>
      )}

      <ModalContainer />
    </>
  );
}
