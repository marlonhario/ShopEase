import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  decreaseItem: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);

          if (existing) {
            // toast("Good Job!", {
            //   icon: "🛒",
            // });

            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }

          // toast("Good Job!", {
          //   icon: "🛒",
          // });

          return { items: [...state.items, item] };
        }),
      decreaseItem: (id) =>
        set((state) => {
          return {
            items: state.items
              .map((item) =>
                item.id === id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item,
              )
              .filter((item) => item.quantity > 0),
          };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearCart: () => {
        set(() => {
          return { items: [] };
        });
      },
    }),
    { name: "cart" },
  ),
);
