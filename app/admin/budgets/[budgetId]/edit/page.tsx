import EditBudgetForm from "@/components/budgets/EditBudgetForm";
import { getBudgetById } from "@/src/services/budgets";
import { Metadata } from "next";
import Link from "next/link";

type EditBudgetPageProps = {
  params: Promise<{
    budgetId: string;
  }>;
};


//generateMetadata es una función de next para Metadatadinámico
export async function generateMetadata({ params }: EditBudgetPageProps) : Promise<Metadata> {
  const { budgetId } = await params
  const budget = await getBudgetById(+budgetId);

  return {
    title: `CashTracker - ${budget?.name}`,
    description: `Descripción del presupuesto ${budget?.name}`,
  } 
}

export default async function EditBudgetPage({ params }: EditBudgetPageProps) {
  const { budgetId } = await params;

  const budget = await getBudgetById(+budgetId);

  if (!budget)
    return (
      <p className=" text-center text-2xl font-purple-950">
        No hay resultados{" "}
      </p>
    );
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
        <div className="w-full md:w-auto">
          <h1 className="font-black text-4xl text-purple-950 my-5">
            Editar Presupuesto: { budget.name}
          </h1>
          <p className="text-xl font-bold">
            Llena el formulario y crea un nuevo {""}
            <span className="text-amber-500">presupuesto</span>
          </p>
        </div>
        <Link
          href={"/admin"}
          className="bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
        >
          Volver
        </Link>
      </div>
      <div className="p-10 mt-10  shadow-lg border ">
        <EditBudgetForm budget={budget}/>
      </div>
    </>
  );
}
