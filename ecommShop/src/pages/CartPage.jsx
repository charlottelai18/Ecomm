import { useCart } from "../state/cartContext";

export default function CartPage() {
  const { state, dispatch, total } = useCart();

  const items = Object.entries(state.items); 

  if (items.length === 0) {
    return (
      <div style={{ padding: 16 }} className="emptyCart">
        <h1>Oh no!</h1>
        <p>Your cart is empty :(</p>
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

            <div style={styles.info}>
              <div style={styles.name}>{item.name}</div>
              <div style={styles.meta}>Variant: {item.variantKey}</div>
              <div style={styles.price}>${Number(item.price).toFixed(2)}</div>
            </div>

            <div style={styles.controls}>
              <button
                onClick={() => {
                  // if qty would go below 1, remove the item (gives you 0 total)
                  if (item.qty <= 1) {
                    dispatch({ type: "REMOVE_ITEM", payload: { key } });
                  } else {
                    dispatch({
                      type: "SET_QTY",
                      payload: { key, qty: item.qty - 1 },
                    });
                  }
                }}
                style={styles.btn}
              >
                −
              </button>

              <span style={styles.qty}>{item.qty}</span>

              <button
                onClick={() =>
                  dispatch({
                    type: "SET_QTY",
                    payload: { key, qty: item.qty + 1 },
                  })
                }
                style={styles.btn}
                disabled={item.qty >= item.maxStock}
                title={
                  item.qty >= item.maxStock ? "Reached max stock" : "Increase quantity"
                }
              >
                +
              </button>

              <button
                onClick={() => dispatch({ type: "REMOVE_ITEM", payload: { key } })}
                style={styles.remove}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <hr style={{ margin: "16px 0" }} />

      <h2>Total: ${total.toFixed(2)}</h2>

      <button onClick={() => dispatch({ type: "CLEAR_CART" })} style={styles.clear}>
        Clear cart
      </button>
    </div>
  );
}

const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: 14,
    background: "white",
    borderRadius: 14,
    border: "1px solid #eee",
  },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 12,
    objectFit: "cover",
  },
  info: { flex: 1, display: "grid", gap: 4 },
  name: { fontWeight: 800, fontSize: 16, color: "#111" },
  meta: { fontSize: 12, opacity: 0.75, color: "#111" },
  price: { fontWeight: 700, opacity: 0.9, color: "#111" },

  controls: { display: "flex", alignItems: "center", gap: 10 },
  btn: { width: 38, height: 34, borderRadius: 10 },
  qty: { minWidth: 18, textAlign: "center", fontWeight: 800, color: "#111" },

  remove: { padding: "8px 12px", borderRadius: 10 },
  clear: { padding: "10px 14px", borderRadius: 12 },
};
