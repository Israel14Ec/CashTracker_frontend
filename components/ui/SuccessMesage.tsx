import { ReactNode } from "react";

export default function SuccessMessage ({ children }: { children: ReactNode }) {
  return (
    <p className=" text-center my-4 bg-purple-100 text-purple-500 rounded-sm font-semibold px-3 py-1 text-xs uppercase">
      {children}
    </p>
  );
}
