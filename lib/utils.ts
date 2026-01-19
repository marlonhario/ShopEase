import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toastCRUD = {
  create: (msg = "Item added 👏") =>
    toast.success(msg, {
      style: {
        border: "1px solid #22c55e",
        borderRadius: "12px",
      },
    }),

  read: (msg = "Product loaded ℹ️") =>
    toast(msg, {
      style: {
        background: "#020617",
        color: "#fff",
        border: "1px solid #3b82f6",
        borderRadius: "12px",
      },
    }),

  update: (msg = "Item updated ✏️") =>
    toast(msg, {
      style: {
        border: "1px solid #f59e0b",
        borderRadius: "12px",
      },
    }),

  delete: (msg = "Item removed ❌") =>
    toast.error(msg, {
      style: {
        border: "1px solid #ef4444",
        borderRadius: "12px",
      },
    }),
};
