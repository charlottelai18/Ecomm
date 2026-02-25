import { Link } from "react-router-dom";
import { useCart } from "../state/cartContext";

export default function CartPage() {
  const { state, dispatch, total, itemCount } = useCart();
  const items = Object.entries(state.items);

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart__emoji">🛒</div>
        <h1 className="empty-cart__title">Your cart is empty</h1>
        <p className="empty-cart__sub">Looks like you haven't added anything yet!</p>
        <Link to="/" className="empty-cart__btn" style={{ display: "inline-flex", textDecoration: "none" }}>
          🐾 Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>
      <p className="cart-subtitle">{itemCount} item{itemCount !== 1 ? "s" : ""} ready for checkout</p>

      <div className="cart-items">
        {items.map(([key, item]) => (
          <div key={key} className="cart-item">
            <img src={item.imageUrl} alt={item.name} className="cart-item__thumb" />

            <div className="cart-item__info">
              <div className="cart-item__name">{item.name}</div>
              <div className="cart-item__meta">Variant: {item.variantKey}</div>
              <div className="cart-item__price">${(Number(item.price) * item.qty).toFixed(2)}</div>
            </div>

            <div className="cart-item__controls">
              {/* Qty stepper inline */}
              <div className="qty-stepper">
                <button
                  className="qty-stepper__btn"
                  onClick={() => {
                    if (item.qty <= 1) {
                      dispatch({ type: "REMOVE_ITEM", payload: { key } });
                    } else {
                      dispatch({ type: "SET_QTY", payload: { key, qty: item.qty - 1 } });
                    }
                  }}
                >
                  −
                </button>
                <div className="qty-stepper__value">{item.qty}</div>
                <button
                  className="qty-stepper__btn"
                  onClick={() =>
                    dispatch({ type: "SET_QTY", payload: { key, qty: item.qty + 1 } })
                  }
                  disabled={item.qty >= item.maxStock}
                  title={item.qty >= item.maxStock ? "Max stock reached" : "Increase"}
                >
                  +
                </button>
              </div>

              <button
                className="cart-item__remove"
                onClick={() => dispatch({ type: "REMOVE_ITEM", payload: { key } })}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-summary__row">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="cart-summary__row">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="cart-summary__total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="cart-summary__actions">
          <button className="cart-summary__checkout" disabled>
            Proceed to Checkout
          </button>
          <button
            className="cart-summary__clear"
            onClick={() => dispatch({ type: "CLEAR_CART" })}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
