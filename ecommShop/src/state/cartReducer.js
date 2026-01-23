export const initialCartState = {
  items: {},
};

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const item = action.payload;
      const key = item.key;

      const existing = state.items[key];
      const nextQty = (existing?.qty || 0) + 1;

      // prevent exceeding stock
      if (nextQty > item.maxStock) return state;

      return {
        ...state,
        items: {
          ...state.items,
          [key]: existing ? { ...existing, qty: nextQty } : { ...item, qty: 1 },
        },
      };
    }

    case "SET_QTY": {
      const { key, qty } = action.payload;
      const item = state.items[key];
      if (!item) return state;

      const safeQty = Math.max(1, Math.min(qty, item.maxStock));
      return {
        ...state,
        items: { ...state.items, [key]: { ...item, qty: safeQty } },
      };
    }

    case "REMOVE_ITEM": {
      const { key } = action.payload;
      const copy = { ...state.items };
      delete copy[key];
      return { ...state, items: copy };
    }

    case "CLEAR_CART":
      return initialCartState;

    default:
      return state;
  }
}
