import { useCart } from "../state/cartContext";
import QuantityStepper from "../components/QuantityStepper";

export default function CartPage() {
  const { state, dispatch, total } = useCart();
  const items = Object.entries(state.items); // [key, item]

  if (items.length === 0) {
    return (
      <div style={{ padding: 16 }}>
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Cart</h1>

      <div style={{ display: "grid", gap: 12 }}>
        {items.map(([key, item]) => (
          <div key={key} style={styles.row}>
            <img src={item.imageUrl} alt={item.name} style={styles.thumb} />

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{item.name}</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>
                Variant: {item.variantKey}
              </div>
              <div style={{ marginTop: 4 }}>
                ${Number(item.price).toFixed(2)}
              </div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>
                Max stock: {item.maxStock}
              </div>
            </div>

            <QuantityStepper
              value={item.qty}
              min={1}
              max={item.maxStock}
              onChange={(nextQty) =>
                dispatch({ type: "SET_QTY", payload: { key, qty: nextQty } })
              }
            />

            <button
              onClick={() => dispatch({ type: "REMOVE_ITEM", payload: { key } })}
              style={styles.remove}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <hr style={{ margin: "16px 0" }} />

      <h2>Total: ${total.toFixed(2)}</h2>

      <button
        onClick={() => dispatch({ type: "CLEAR_CART" })}
        style={styles.clear}
      >
        Clear cart
      </button>
    </div>
  );
}

const styles = {
  row: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    padding: 12,
    border: "1px solid #eee",
    borderRadius: 12,
    background: "white",
  },
  thumb: { width: 64, height: 64, borderRadius: 10, objectFit: "cover" },
  remove: { padding: "8px 10px" },
  clear: { padding: "10px 12px", borderRadius: 10 },
};
