import { createContext, useContext, useMemo, useReducer } from "react";
import { cartReducer, initialCartState } from "./cartReducer";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const itemCount = useMemo(() => {
    return Object.values(state.items).reduce((sum, item) => sum + item.qty, 0);
  }, [state.items]);

  const total = useMemo(() => {
    return Object.values(state.items).reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch, itemCount, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
