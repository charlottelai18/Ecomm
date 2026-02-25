import { Link } from "react-router-dom";
import { useCart } from "../state/cartContext";

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="navBar">
      <div className="navInner">
        <Link to="/" className="brand">
          Pawrific<span>.</span>
        </Link>

        <nav className="navLinks">
          <Link to="/">Home</Link>
          <Link to="/cart" className="cartLink">
            🛒 Cart
            {itemCount > 0 && (
              <span className="cart-badge">{itemCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
