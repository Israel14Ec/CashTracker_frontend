import { ReactNode } from "react";

export default function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <p className=" text-center my-4 bg-red-100 text-red-500 rounded-sm font-semibold px-3 py-1 text-xs uppercase">
      {children}
    </p>
  );
}
